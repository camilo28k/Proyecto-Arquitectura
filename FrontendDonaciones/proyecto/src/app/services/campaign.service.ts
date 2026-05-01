import { axiosClient } from "@/app/services/axios.service";
import {
  Campaign,
  CampaignCategory,
  CampaignFormInput,
} from "../features/campaigns/campaign.types";
import { CAMPAIGN_CATEGORIES } from "../features/campaigns/campaign.config";
import { useAuthStore } from "@/app/stores/auth.store";

const STORAGE_PREFIX = "donation-campaigns";

function storageKey(category: CampaignCategory) {
  return `${STORAGE_PREFIX}:${category}`;
}

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function normalizeCampaign(campaign: Campaign): Campaign {
  return {
    ...campaign,
    goal: Number(campaign.goal) || 0,
    raised: Number(campaign.raised) || 0,
  };
}

function readLocalCampaigns(category: CampaignCategory): Campaign[] {
  if (!canUseStorage()) return [];

  try {
    const value = window.localStorage.getItem(storageKey(category));
    if (!value) return [];

    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(normalizeCampaign) : [];
  } catch {
    return [];
  }
}

function writeLocalCampaigns(
  category: CampaignCategory,
  campaigns: Campaign[]
) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(storageKey(category), JSON.stringify(campaigns));
}

function makeLocalCampaign(
  input: CampaignFormInput,
  userId: string
): Campaign {
  const fallbackId = Math.random().toString(36).slice(2);

  return {
    ...input,
    id: `local-${fallbackId}`,
    userId, // 🔥 IMPORTANTE
    createdAt: new Date().toISOString(),
    localOnly: true,
  };
}

function mergeCampaigns(
  serverCampaigns: Campaign[],
  localCampaigns: Campaign[]
) {
  const campaigns = new Map<string, Campaign>();

  [...localCampaigns, ...serverCampaigns].forEach((campaign) => {
    const key =
      campaign.id ?? `${campaign.title}-${campaign.createdAt ?? ""}`;
    campaigns.set(key, normalizeCampaign(campaign));
  });

  return Array.from(campaigns.values()).sort((a, b) => {
    const dateA = new Date(a.createdAt ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? 0).getTime();
    return dateB - dateA;
  });
}

function upsertLocalCampaign(
  category: CampaignCategory,
  campaign: Campaign
) {
  const localCampaigns = readLocalCampaigns(category);
  const nextCampaigns = [
    campaign,
    ...localCampaigns.filter((item) => item.id !== campaign.id),
  ];
  writeLocalCampaigns(category, nextCampaigns);
}

function removeLocalCampaign(category: CampaignCategory, id: string) {
  const nextCampaigns = readLocalCampaigns(category).filter(
    (campaign) => campaign.id !== id
  );
  writeLocalCampaigns(category, nextCampaigns);
}

export async function getCampaigns(
  category: CampaignCategory
): Promise<Campaign[]> {
  const config = CAMPAIGN_CATEGORIES[category];
  const { data } = await axiosClient.get<Campaign[] | null>(
    config.endpoint
  );

  const serverCampaigns = Array.isArray(data)
    ? data.map(normalizeCampaign)
    : [];

  return mergeCampaigns(serverCampaigns, readLocalCampaigns(category));
}

export async function createCampaign(
  category: CampaignCategory,
  input: CampaignFormInput
): Promise<Campaign> {
  const config = CAMPAIGN_CATEGORIES[category];

  const payload = {
    title: input.title,
    description: input.description,
    goal: Number(input.goal),
    raised: Number(input.raised) || 0,
  };

  const { data } = await axiosClient.post<Campaign | null>(
    config.endpoint,
    payload
  );

  const userId = useAuthStore.getState().user?.id || "";

  const campaign =
    data && typeof data === "object"
      ? normalizeCampaign(data)
      : makeLocalCampaign(payload, userId);

  if (campaign.localOnly || !campaign.id) {
    upsertLocalCampaign(category, campaign);
  }

  return campaign;
}

export async function updateCampaignProgress(
  category: CampaignCategory,
  campaign: Campaign,
  amount: number
): Promise<Campaign> {
  const nextCampaign = normalizeCampaign({
    ...campaign,
    raised: Number(campaign.raised) + amount,
  });

  if (!campaign.id || campaign.localOnly) {
    upsertLocalCampaign(category, nextCampaign);
    return nextCampaign;
  }

  const config = CAMPAIGN_CATEGORIES[category];

  const { data } = await axiosClient.patch<Campaign>(
    `${config.endpoint}/id/${campaign.id}`,
    { raised: nextCampaign.raised }
  );

  return data ? normalizeCampaign(data) : nextCampaign;
}

export async function deleteCampaign(
  category: CampaignCategory,
  campaign: Campaign
) {
  if (!campaign.id || campaign.localOnly) {
    if (campaign.id) removeLocalCampaign(category, campaign.id);
    return;
  }

  const config = CAMPAIGN_CATEGORIES[category];

  await axiosClient.delete(`${config.endpoint}/id/${campaign.id}`);
}
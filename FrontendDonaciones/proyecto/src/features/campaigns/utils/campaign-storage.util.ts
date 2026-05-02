import type {
  Campaign,
  CampaignCategory,
  CampaignFormInput,
} from "../types/campaign.types";

const STORAGE_PREFIX = "donation-campaigns";

function storageKey(category: CampaignCategory) {
  return `${STORAGE_PREFIX}:${category}`;
}

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function normalizeCampaign(campaign: Campaign): Campaign {
  return {
    ...campaign,
    goal: Number(campaign.goal) || 0,
    raised: Number(campaign.raised) || 0,
  };
}

export function readLocalCampaigns(category: CampaignCategory): Campaign[] {
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

export function writeLocalCampaigns(
  category: CampaignCategory,
  campaigns: Campaign[]
) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(storageKey(category), JSON.stringify(campaigns));
}

export function makeLocalCampaign(
  input: CampaignFormInput,
  userId: string
): Campaign {
  const fallbackId = Math.random().toString(36).slice(2);

  return {
    ...input,
    id: `local-${fallbackId}`,
    userId,
    createdAt: new Date().toISOString(),
    localOnly: true,
  };
}

export function mergeCampaigns(
  serverCampaigns: Campaign[],
  localCampaigns: Campaign[]
): Campaign[] {
  const campaigns = new Map<string, Campaign>();

  [...localCampaigns, ...serverCampaigns].forEach((campaign) => {
    const key = campaign.id ?? `${campaign.title}-${campaign.createdAt ?? ""}`;
    campaigns.set(key, normalizeCampaign(campaign));
  });

  return Array.from(campaigns.values()).sort((a, b) => {
    const dateA = new Date(a.createdAt ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? 0).getTime();

    return dateB - dateA;
  });
}

export function upsertLocalCampaign(
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

export function removeLocalCampaign(category: CampaignCategory, id: string) {
  const nextCampaigns = readLocalCampaigns(category).filter(
    (campaign) => campaign.id !== id
  );

  writeLocalCampaigns(category, nextCampaigns);
}
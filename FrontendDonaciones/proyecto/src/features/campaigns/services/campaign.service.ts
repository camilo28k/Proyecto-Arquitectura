import { axiosClient } from "@/shared/services/axios.service";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { CAMPAIGN_CATEGORIES } from "../config/campaign.config";
import type {
  Campaign,
  CampaignCategory,
  CampaignFormInput,
} from "../types/campaign.types";

import {
  makeLocalCampaign,
  mergeCampaigns,
  normalizeCampaign,
  readLocalCampaigns,
  removeLocalCampaign,
  upsertLocalCampaign,
} from "../utils/campaign-storage.util";

/* =========================
   GET CAMPAIGNS
========================= */
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

  const localCampaigns = readLocalCampaigns(category);

  return mergeCampaigns(serverCampaigns, localCampaigns);
}

/* =========================
   CREATE CAMPAIGN
========================= */
export async function createCampaign(
  category: CampaignCategory,
  input: CampaignFormInput
): Promise<Campaign> {
  const config = CAMPAIGN_CATEGORIES[category];

  const payload: CampaignFormInput = {
    title: input.title.trim(),
    description: input.description.trim(),
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

/* =========================
   UPDATE PROGRESS
========================= */
export async function updateCampaignProgress(
  category: CampaignCategory,
  campaign: Campaign,
  amount: number
): Promise<Campaign> {
  const nextCampaign = normalizeCampaign({
    ...campaign,
    raised: Number(campaign.raised) + Number(amount),
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

/* =========================
   DELETE CAMPAIGN
========================= */
export async function deleteCampaign(
  category: CampaignCategory,
  campaign: Campaign
): Promise<void> {
  if (!campaign.id || campaign.localOnly) {
    if (campaign.id) removeLocalCampaign(category, campaign.id);
    return;
  }

  const config = CAMPAIGN_CATEGORIES[category];

  await axiosClient.delete(config.deletePath(campaign.id));
}
import { apiFetch } from "@/lib/api";
import { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from "@/types/campaign";


type CampaignListResponse = {
  message: string;
  campaigns: Campaign[];
};

type CampaignResponse = {
  message: string;
  campaign: Campaign;
};

export const campaignService = {
  findAll(category?: string): Promise<CampaignListResponse> {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";

    return apiFetch<CampaignListResponse>(`/campaigns${query}`);
  },

  findOne(id: string): Promise<CampaignResponse> {
    return apiFetch<CampaignResponse>(`/campaigns/${id}`);
  },

  create(data: CreateCampaignRequest): Promise<CampaignResponse> {
    return apiFetch<CampaignResponse>("/campaigns", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: UpdateCampaignRequest): Promise<CampaignResponse> {
    return apiFetch<CampaignResponse>(`/campaigns/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  remove(id: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/campaigns/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
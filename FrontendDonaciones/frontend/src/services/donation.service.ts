import { apiFetch } from "@/lib/api";
import { CreateDonationRequest, Donation, DonationStatus } from "@/types/donation";


type DonationListResponse = {
  message: string;
  donations: Donation[];
};

type DonationResponse = {
  message: string;
  donation: Donation;
};

export const donationService = {
  findAll(): Promise<DonationListResponse> {
    return apiFetch<DonationListResponse>("/donations", {
      auth: true,
    });
  },

  findMyDonations(): Promise<DonationListResponse> {
    return apiFetch<DonationListResponse>("/donations/my-donations", {
      auth: true,
    });
  },

  findByCampaign(campaignId: string): Promise<DonationListResponse> {
    return apiFetch<DonationListResponse>(
      `/donations/campaign/${campaignId}`,
    );
  },

  findOne(id: string): Promise<DonationResponse> {
    return apiFetch<DonationResponse>(`/donations/${id}`, {
      auth: true,
    });
  },

  create(data: CreateDonationRequest): Promise<DonationResponse> {
    return apiFetch<DonationResponse>("/donations", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  updateStatus(
    id: string,
    status: DonationStatus,
  ): Promise<DonationResponse> {
    return apiFetch<DonationResponse>(`/donations/${id}/status`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify({ status }),
    });
  },
};  
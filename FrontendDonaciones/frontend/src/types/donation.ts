import { Campaign } from "./campaign";
import { User } from "./user";

export type DonationStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface Donation {
  id: string;
  amount: number;
  status: DonationStatus;

  userId: string;
  campaignId: string;

  user?: User;
  campaign?: Campaign;

  createdAt: string;
  updatedAt: string;
}

export interface CreateDonationRequest {
  amount: number;
  campaignId: string;
}

export interface UpdateDonationStatusRequest {
  status: DonationStatus;
}
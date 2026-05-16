import { Category } from "./category";
import { User } from "./user";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  imageUrl?: string | null;

  userId: string;
  categoryId: string;

  user?: User;
  category?: Category;

  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignRequest {
  title: string;
  description: string;
  goal: number;
  imageUrl?: string;
  categoryId: string;
}

export interface UpdateCampaignRequest {
  title?: string;
  description?: string;
  goal?: number;
  imageUrl?: string;
  categoryId?: string;
}
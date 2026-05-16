import { Campaign } from "./campaign";

export interface Category {
  id: string;
  name: string;
  description?: string | null;

  campaigns?: Campaign[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}
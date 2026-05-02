export type CampaignCategory =
  | "health"
  | "education"
  | "technology"
  | "art"
  | "entrepreneurship"
  | "environment"
  | "universityproject";

export type Campaign = {
  userId: string;
  id?: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  createdAt?: string;
  updatedAt?: string;
  localOnly?: boolean;
};

export type CampaignFormInput = {
  title: string;
  description: string;
  goal: number;
  raised: number;
};

export type CampaignCategoryConfig = {
  key: CampaignCategory;
  endpoint: string;
  title: string;
  navName: string;
  description: string;
  accent: string;
  acceptsImage: boolean;
  deletePath: (id: string) => string;
};

export type CampaignRouteItem = {
  path: string;
  name: string;
};
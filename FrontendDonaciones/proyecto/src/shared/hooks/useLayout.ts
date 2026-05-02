import {
  CAMPAIGN_CATEGORIES,
  CAMPAIGN_ROUTE_ITEMS,
} from "@/features/campaigns/config/campaign.config";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Panel de donaciones",
  "/dashboard": "Panel de donaciones",
  "/health": CAMPAIGN_CATEGORIES.health.title,
  "/education": CAMPAIGN_CATEGORIES.education.title,
  "/technology": CAMPAIGN_CATEGORIES.technology.title,
  "/art": CAMPAIGN_CATEGORIES.art.title,
  "/entrepreneurship": CAMPAIGN_CATEGORIES.entrepreneurship.title,
  "/environment": CAMPAIGN_CATEGORIES.environment.title,
  "/universityproject": CAMPAIGN_CATEGORIES.universityproject.title,
};

export function useLayout(pathname: string) {
  return {
    title: ROUTE_TITLES[pathname] ?? "Panel de donaciones",
    route: CAMPAIGN_ROUTE_ITEMS,
  };
}
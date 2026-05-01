import {
  CAMPAIGN_CATEGORIES,
  CAMPAIGN_ROUTE_ITEMS,
} from "../features/campaigns/campaign.config";

export function useLayout(pathname: string) {
  const title =
    pathname === "/"
      ? "Panel de donaciones"
      : pathname === "/health"
      ? CAMPAIGN_CATEGORIES.health.title
      : pathname === "/education"
      ? CAMPAIGN_CATEGORIES.education.title
      : pathname === "/technology"
      ? CAMPAIGN_CATEGORIES.technology.title
      : pathname === "/art"
      ? CAMPAIGN_CATEGORIES.art.title
      : pathname === "/environment"
      ? CAMPAIGN_CATEGORIES.environment.title
      : pathname === "universityproject"
      ? CAMPAIGN_CATEGORIES.universityproject.title
      : CAMPAIGN_CATEGORIES.entrepreneurship.title;

  return {
    title,
    route: CAMPAIGN_ROUTE_ITEMS,
  };
}

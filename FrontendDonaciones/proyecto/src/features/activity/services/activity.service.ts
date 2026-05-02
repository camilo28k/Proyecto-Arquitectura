
import { axiosClient } from "@/shared/services/axios.service";
import type { Activity } from "../types/activity.types";

export async function getActivities(): Promise<Activity[]> {
  const { data } = await axiosClient.get<Activity[] | null>("/activity");
  return Array.isArray(data) ? data : [];
}

export async function createActivityRequest(
  objetivo: string
): Promise<Activity> {
  const { data } = await axiosClient.post<Activity>("/activity", { objetivo });
  return data;
}
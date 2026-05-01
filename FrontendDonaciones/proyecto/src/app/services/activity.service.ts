import { axiosClient } from "@/app/services/axios.service";


export type Activity = {
  id?: string;
  objetivo: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function getActivities(): Promise<Activity[]> {
  const { data } = await axiosClient.get<Activity[] | null>("/activity");
  return Array.isArray(data) ? data : [];
}

export async function createActivity(objetivo: string): Promise<Activity> {
  const { data } = await axiosClient.post<Activity>("/activity", { objetivo });
  return data;
}

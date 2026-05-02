export type Activity = {
  id?: string;
  objetivo: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ActivityState = {
  activities: Activity[];
  activity: Activity | null;
  isLoading: boolean;
  error: string | null;

  fetchActivities: () => Promise<void>;
  createActivity: (objetivo: string) => Promise<void>;
};
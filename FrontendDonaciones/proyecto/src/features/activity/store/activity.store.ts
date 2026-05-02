import { create } from "zustand";
import type { ActivityState } from "../types/activity.types";
import {
  getActivities,
  createActivityRequest,
} from "../services/activity.service";

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  activity: null,
  isLoading: false,
  error: null,

  fetchActivities: async () => {
    try {
      set({ isLoading: true, error: null });

      const activities = await getActivities();

      set({
        activities,
        isLoading: false,
      });
    } catch {
      set({
        error: "No se pudieron cargar los objetivos",
        isLoading: false,
      });
    }
  },

  createActivity: async (objetivo) => {
    try {
      set({ isLoading: true, error: null });

      const activity = await createActivityRequest(objetivo);

      set({
        activity,
        activities: [activity, ...get().activities],
        isLoading: false,
      });
    } catch {
      set({
        error: "No se pudo crear el objetivo",
        isLoading: false,
      });
    }
  },
}));
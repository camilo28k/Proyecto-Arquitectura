import { create } from "zustand";
import { Activity, createActivity, getActivities } from "../services/activity.service";


type Store = {
    activity: Activity | null;
    activities: Activity[];
    isLoading: boolean;
    error: string;
    fetchActivities: () => Promise<void>;
    createActivity: (objetivo: string) => Promise<void>;
};

export const useActivityStore = create<Store>()((set) => ({
    activity: null,
    activities: [],
    isLoading: false,
    error: "",
    fetchActivities: async () => {
        set({ isLoading: true, error: "" });
        try {
            const activities = await getActivities();
            set({ activities });
        } catch {
            set({ error: "No se pudieron cargar los objetivos." });
        } finally {
            set({ isLoading: false });
        }
    },
    createActivity: async (objetivo: string) => {
        try {
            const data = await createActivity(objetivo);
            set((state) => ({
                activity: data,
                activities: [data, ...state.activities],
            }));
        } catch {
            set({ error: "No se pudo crear el objetivo." });
        }
    },
}));

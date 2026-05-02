import { create } from "zustand";
import { loginUser, registerUser } from "../services/auth.service";
import type { AuthStore } from "../types/auth.types";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const response = await loginUser(data);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set({
        user: response.user,
        token: response.access_token,
        isLoading: false,
      });

      return true;
    } catch {
      set({
        error: "Correo o contraseña incorrectos",
        isLoading: false,
      });

      return false;
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const response = await registerUser(data);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set({
        user: response.user,
        token: response.access_token,
        isLoading: false,
      });

      return true;
    } catch {
      set({
        error: "No se pudo crear la cuenta",
        isLoading: false,
      });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      error: null,
    });
  },

  loadSession: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) return;

    set({
      token,
      user: JSON.parse(user),
    });
  },
}));
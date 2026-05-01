import { create } from "zustand";
import {
  AuthUser,
  LoginDto,
  RegisterDto,
  loginUser,
  registerUser,
} from "@/app/services/auth.service";

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (data: LoginDto) => Promise<boolean>;
  register: (data: RegisterDto) => Promise<boolean>;
  logout: () => void;
  loadSession: () => void;
};

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

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
      });
    }
  },
}));
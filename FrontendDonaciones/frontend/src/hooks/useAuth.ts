"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { authService } from "@/services/auth.service";
import { LoginRequest, RegisterRequest } from "@/types/auth";


type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string;
};

export function useAuth() {
  const router = useRouter();

  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    const user = authService.getCurrentUser() as User | null;
    const token = authService.getToken();

    setState({
      user,
      token,
      loading: false,
      error: "",
    });
  }, []);

  async function login(data: LoginRequest) {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: "",
      }));

      const response = await authService.login(data);

      setState({
        user: response.user,
        token: response.access_token,
        loading: false,
        error: "",
      });

      router.push("/campaigns");
      router.refresh();

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al iniciar sesión";

      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));

      throw err;
    }
  }

  async function register(data: RegisterRequest) {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: "",
      }));

      const response = await authService.register(data);

      setState({
        user: response.user,
        token: response.access_token,
        loading: false,
        error: "",
      });

      router.push("/campaigns");
      router.refresh();

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear la cuenta";

      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));

      throw err;
    }
  }

  function logout() {
    authService.logout();

    setState({
      user: null,
      token: null,
      loading: false,
      error: "",
    });

    router.push("/login");
    router.refresh();
  }

  function requireAuth() {
    const token = authService.getToken();

    if (!token) {
      router.push("/login");
      return false;
    }

    return true;
  }

  function requireAdmin() {
    const user = authService.getCurrentUser() as User | null;

    if (!user || user.role !== "ADMIN") {
      router.push("/");
      return false;
    }

    return true;
  }

  return {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    isAuthenticated: Boolean(state.token),
    isAdmin: state.user?.role === "ADMIN",
    login,
    register,
    logout,
    requireAuth,
    requireAdmin,
  };
}
import { apiFetch } from "@/lib/api";
import { storage } from "@/lib/storage";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { User } from "@/types/user";


export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      }),
    });

    storage.setToken(response.access_token);
    storage.setUser(response.user);

    return response;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name?.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      }),
    });

    storage.setToken(response.access_token);
    storage.setUser(response.user);

    return response;
  },

  logout(): void {
    storage.clear();
  },

  getCurrentUser(): User | null {
    return storage.getUser<User>();
  },

  getToken(): string | null {
    return storage.getToken();
  },
};
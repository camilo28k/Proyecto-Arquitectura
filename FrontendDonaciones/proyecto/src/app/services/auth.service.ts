import { axiosClient } from "@/app/services/axios.service";

export type UserRole = "ADMIN" | "USER";

export type AuthUser = {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name?: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  access_token: string;
  user: AuthUser;
};

export async function loginUser(data: LoginDto): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function registerUser(data: RegisterDto): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/register", data);
  return response.data;
}
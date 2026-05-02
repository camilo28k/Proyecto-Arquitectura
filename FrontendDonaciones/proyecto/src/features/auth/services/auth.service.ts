import { axiosClient } from "@/shared/services/axios.service";
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
} from "../types/auth.types";

export async function loginUser(data: LoginDto): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function registerUser(data: RegisterDto): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/register", data);
  return response.data;
}
export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  name?: string | null;
  email: string;
  role: Role;

  createdAt?: string;
  updatedAt?: string;
}
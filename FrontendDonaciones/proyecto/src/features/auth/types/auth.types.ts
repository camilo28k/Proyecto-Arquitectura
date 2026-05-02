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

export type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (data: LoginDto) => Promise<boolean>;
  register: (data: RegisterDto) => Promise<boolean>;
  logout: () => void;
  loadSession: () => void;
};
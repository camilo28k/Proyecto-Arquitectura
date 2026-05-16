import { env } from "@/config/env";
import { storage } from "@/lib/storage";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

function getErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Error en la petición";
  }

  const errorData = data as ApiErrorResponse;

  if (Array.isArray(errorData.message)) {
    return errorData.message.join(", ");
  }

  if (typeof errorData.message === "string") {
    return errorData.message;
  }

  if (typeof errorData.error === "string") {
    return errorData.error;
  }

  return "Error en la petición";
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { auth = false, headers, ...rest } = options;

  const token = storage.getToken();
  const isFormData = rest.body instanceof FormData;

  const finalHeaders: HeadersInit = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...rest,
    headers: finalHeaders,
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data as T;
}
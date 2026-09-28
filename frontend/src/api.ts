const API_BASE = import.meta.env.VITE_API_URL || "";

interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  let data: T;
  try {
    data = await response.json();
  } catch {
    data = { error: `Server error (${response.status})` } as T;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
}

interface AuthResponse {
  user: User;
}

interface ErrorResponse {
  error: string;
}

export const api = {
  register: (auth: {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) =>
    request<AuthResponse | ErrorResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ auth }),
    }),

  login: (auth: { email: string; password: string }) =>
    request<AuthResponse | ErrorResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ auth }),
    }),

  logout: () =>
    request<{ message: string }>("/api/v1/auth/logout", {
      method: "DELETE",
    }),

  me: () => request<AuthResponse | ErrorResponse>("/api/v1/auth/me"),
};

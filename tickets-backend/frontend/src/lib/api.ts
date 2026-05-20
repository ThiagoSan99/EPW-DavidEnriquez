const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface JwtResponseData {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  role: string;
}

interface UserResponseData {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  role: string;
  enabled: boolean;
  createdAt: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<BackendApiResponse<T>> {
  const token = localStorage.getItem("authToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error: ApiError = {
      message: body.message || body.error || `Error ${res.status}`,
      status: res.status,
    };
    throw error;
  }

  return body as BackendApiResponse<T>;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const res = await request<JwtResponseData>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const d = res.data;
  return {
    token: d.token,
    user: {
      id: d.id,
      email: d.email,
      nombre: d.nombre,
    },
  };
}

export async function getProfile(): Promise<LoginResponse["user"]> {
  const res = await request<UserResponseData>("/auth/profile");
  const d = res.data;
  return { id: d.id, email: d.email, nombre: d.nombre };
}

export interface TicketData {
  id: number;
  titulo: string;
  descripcion: string;
  status: string;
  prioridad: string;
  categoriaId: number | null;
  categoriaNombre: string | null;
  creadoPorId: number;
  creadoPorUsername: string;
  asignadoAId: number | null;
  asignadoAUsername: string | null;
  asignadoANombreCompleto: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
}

export interface CategoryData {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt: string;
}

export async function getTickets(): Promise<TicketData[]> {
  const res = await request<TicketData[]>("/tickets");
  return res.data;
}

export async function getCategories(): Promise<CategoryData[]> {
  const res = await request<CategoryData[]>("/categorias");
  return res.data;
}

export interface CreateTicketRequest {
  titulo: string;
  descripcion: string;
  prioridad: string;
  categoriaId?: number | null;
}

export async function createTicket(data: CreateTicketRequest): Promise<TicketData> {
  const res = await request<TicketData>("/tickets", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}

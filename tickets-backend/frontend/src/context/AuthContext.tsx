"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { login as apiLogin, type LoginResponse } from "@/lib/api";
import { isTokenValid, decodeJwt, type JwtPayload } from "@/lib/jwt";

interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const STORAGE_TOKEN_KEY = "authToken";
const STORAGE_USER_KEY = "authUser";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function loadFromStorage(): AuthState {
  if (typeof window === "undefined") {
    return { user: null, token: null, loading: true };
  }

  const token = localStorage.getItem(STORAGE_TOKEN_KEY);

  if (!isTokenValid(token)) {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    return { user: null, token: null, loading: false };
  }

  let user: LoginResponse["user"] | null = null;
  try {
    const stored = localStorage.getItem(STORAGE_USER_KEY);
    if (stored) {
      user = JSON.parse(stored);
    } else {
      const payload: JwtPayload | null = token ? decodeJwt(token) : null;
      if (payload?.sub) {
        user = {
          id: payload.id ?? 0,
          email: payload.email ?? "",
          nombre: payload.nombre || payload.sub,
        };
      }
    }
  } catch {
    user = null;
  }

  return { user, token, loading: false };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    setState(loadFromStorage());
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await apiLogin(username, password);

    localStorage.setItem(STORAGE_TOKEN_KEY, res.token);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(res.user));

    setState({ user: res.user, token: res.token, loading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    setState({ user: null, token: null, loading: false });
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    isAuthenticated: state.token !== null && state.user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

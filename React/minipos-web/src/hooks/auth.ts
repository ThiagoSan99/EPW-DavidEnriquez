// auth.ts
import {jwtDecode} from "jwt-decode";

export function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return {
      username: decoded.sub,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

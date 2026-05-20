export interface JwtPayload {
  sub?: string;
  id?: number;
  email?: string;
  nombre?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  try {
    return atob(padded);
  } catch {
    return "";
  }
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = base64UrlDecode(payload);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token || token.trim() === "") return false;

  const payload = decodeJwt(token);
  if (!payload) return false;

  if (payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return false;
  }

  return true;
}

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <ProtectedRoute>
      <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h1>Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #555",
              borderRadius: 4,
              background: "transparent",
              color: "var(--foreground)",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </header>

        <section
          style={{
            border: "1px solid #333",
            borderRadius: 8,
            padding: "1.5rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Bienvenido</h2>
          {user && (
            <div>
              <p>
                <strong>Nombre:</strong> {user.nombre}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
            </div>
          )}
        </section>

        <p style={{ marginTop: "2rem", color: "#888" }}>
          Esta es una ruta protegida. Solo usuarios autenticados pueden verla.
        </p>
      </div>
    </ProtectedRoute>
  );
}

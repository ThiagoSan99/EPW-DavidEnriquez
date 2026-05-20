"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getTickets, getCategories, type TicketData, type CategoryData } from "@/lib/api";
import styles from "./tickets.module.css";

const STATUS_LABELS: Record<string, string> = {
  ABIERTO: "Abierto",
  EN_PROCESO: "En proceso",
  PENDIENTE: "Pendiente",
  RESUELTO: "Resuelto",
  CERRADO: "Cerrado",
};

const PRIORIDAD_LABELS: Record<string, string> = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta",
  CRITICA: "Crítica",
};

const PRIORIDAD_ORDER: Record<string, number> = {
  CRITICA: 0,
  ALTA: 1,
  MEDIA: 2,
  BAJA: 3,
};

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterAsignado, setFilterAsignado] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [ticketData, categoryData] = await Promise.all([
          getTickets(),
          getCategories(),
        ]);
        setTickets(ticketData);
        setCategories(categoryData);
      } catch {
        setError("No se pudieron cargar los tickets");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets
      .filter((t) => !filterStatus || t.status === filterStatus)
      .filter((t) => !filterPrioridad || t.prioridad === filterPrioridad)
      .filter((t) => !filterCategoria || t.categoriaNombre === filterCategoria)
      .filter(
        (t) =>
          !filterAsignado ||
          (t.asignadoANombreCompleto ?? "")
            .toLowerCase()
            .includes(filterAsignado.toLowerCase())
      )
      .sort((a, b) => (PRIORIDAD_ORDER[a.prioridad] ?? 99) - (PRIORIDAD_ORDER[b.prioridad] ?? 99));
  }, [tickets, filterStatus, filterPrioridad, filterCategoria, filterAsignado]);

  const statusOptions = useMemo(
    () => [...new Set(tickets.map((t) => t.status))],
    [tickets]
  );
  const prioridadOptions = useMemo(
    () => [...new Set(tickets.map((t) => t.prioridad))],
    [tickets]
  );
  const categoriaOptions = useMemo(
    () =>
      [...new Set(tickets.filter((t) => t.categoriaNombre).map((t) => t.categoriaNombre!))].sort(),
    [tickets]
  );

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function statusClass(status: string) {
    return `status-${status.toLowerCase()}`;
  }

  function prioridadClass(p: string) {
    return `prioridad-${p.toLowerCase()}`;
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className={styles.loading}>Cargando tickets...</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => router.push("/dashboard")} className={styles.backButton}>
            &larr; Volver al Dashboard
          </button>
          <button onClick={() => router.push("/tickets/nuevo")} className={styles.createButton}>
            + Nuevo Ticket
          </button>
        </div>
        <h1 className={styles.title}>Tickets</h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.filters}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.select}
          >
            <option value="">Todos los estados</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s] ?? s}
              </option>
            ))}
          </select>

          <select
            value={filterPrioridad}
            onChange={(e) => setFilterPrioridad(e.target.value)}
            className={styles.select}
          >
            <option value="">Todas las prioridades</option>
            {prioridadOptions.map((p) => (
              <option key={p} value={p}>
                {PRIORIDAD_LABELS[p] ?? p}
              </option>
            ))}
          </select>

          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className={styles.select}
          >
            <option value="">Todas las categorías</option>
            {categoriaOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={filterAsignado}
            onChange={(e) => setFilterAsignado(e.target.value)}
            placeholder="Filtrar por asignado..."
            className={styles.input}
          />
        </div>

        <div className={styles.count}>
          {filteredTickets.length} de {tickets.length} tickets
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Categoría</th>
                <th>Asignado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.empty}>
                    No se encontraron tickets
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id}>
                    <td className={styles.titulo}>{t.titulo}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[statusClass(t.status)]}`}>
                        {STATUS_LABELS[t.status] ?? t.status}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles[prioridadClass(t.prioridad)]}`}>
                        {PRIORIDAD_LABELS[t.prioridad] ?? t.prioridad}
                      </span>
                    </td>
                    <td>{t.categoriaNombre ?? "—"}</td>
                    <td>{t.asignadoANombreCompleto ?? "Sin asignar"}</td>
                    <td>{formatDate(t.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.cards}>
          {filteredTickets.length === 0 && (
            <div className={styles.empty}>No se encontraron tickets</div>
          )}
          {filteredTickets.map((t) => (
            <div key={t.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitulo}>{t.titulo}</h3>
                <div className={styles.cardBadges}>
                  <span className={`${styles.badge} ${styles[statusClass(t.status)]}`}>
                    {STATUS_LABELS[t.status] ?? t.status}
                  </span>
                  <span className={`${styles.badge} ${styles[prioridadClass(t.prioridad)]}`}>
                    {PRIORIDAD_LABELS[t.prioridad] ?? t.prioridad}
                  </span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardRow}>
                  <span className={styles.cardLabel}>Categoría:</span>
                  <span>{t.categoriaNombre ?? "—"}</span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardLabel}>Asignado:</span>
                  <span>{t.asignadoANombreCompleto ?? "Sin asignar"}</span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardLabel}>Fecha:</span>
                  <span>{formatDate(t.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

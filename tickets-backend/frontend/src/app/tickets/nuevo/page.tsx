"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { createTicket, getCategories, type CategoryData } from "@/lib/api";
import styles from "./nuevo.module.css";

const PRIORIDADES = [
  { value: "", label: "Seleccionar prioridad" },
  { value: "BAJA", label: "Baja" },
  { value: "MEDIA", label: "Media" },
  { value: "ALTA", label: "Alta" },
  { value: "CRITICA", label: "Crítica" },
];

interface FormErrors {
  titulo?: string;
  descripcion?: string;
  prioridad?: string;
}

export default function NuevoTicketPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!titulo.trim()) e.titulo = "El título es obligatorio";
    if (!descripcion.trim()) e.descripcion = "La descripción es obligatoria";
    if (!prioridad) e.prioridad = "Selecciona una prioridad";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      await createTicket({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        prioridad,
        categoriaId: categoriaId ? Number(categoriaId) : null,
      });
      setFeedback({ type: "success", message: "Ticket creado exitosamente" });
      setTitulo("");
      setDescripcion("");
      setPrioridad("");
      setCategoriaId("");
      setErrors({});
      setTimeout(() => router.push("/tickets"), 1500);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Error al crear el ticket";
      setFeedback({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <button onClick={() => router.push("/tickets")} className={styles.backButton}>
          &larr; Volver a Tickets
        </button>

        <h1 className={styles.title}>Nuevo Ticket</h1>

        {feedback && (
          <div className={feedback.type === "success" ? styles.success : styles.error}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="titulo" className={styles.label}>Título</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={`${styles.input} ${errors.titulo ? styles.inputError : ""}`}
              placeholder="Resumen del problema"
            />
            {errors.titulo && <span className={styles.fieldError}>{errors.titulo}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="descripcion" className={styles.label}>Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className={`${styles.textarea} ${errors.descripcion ? styles.inputError : ""}`}
              placeholder="Describe el problema en detalle"
              rows={5}
            />
            {errors.descripcion && <span className={styles.fieldError}>{errors.descripcion}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="prioridad" className={styles.label}>Prioridad</label>
            <select
              id="prioridad"
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className={`${styles.select} ${errors.prioridad ? styles.inputError : ""}`}
            >
              {PRIORIDADES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            {errors.prioridad && <span className={styles.fieldError}>{errors.prioridad}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="categoria" className={styles.label}>Categoría</label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className={styles.select}
            >
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={submitting} className={styles.submit}>
            {submitting ? "Creando ticket..." : "Crear Ticket"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}

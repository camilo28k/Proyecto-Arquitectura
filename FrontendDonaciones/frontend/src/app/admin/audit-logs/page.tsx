"use client";

import { apiFetch } from "@/lib/api";
import { storage } from "@/lib/storage";
import { User } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";


type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "DONATION"
  | "DOCUMENT_UPLOAD"
  | "DOCUMENT_GENERATE";

type AuditLog = {
  id: string;
  action: AuditAction;
  entity?: string | null;
  entityId?: string | null;
  description?: string | null;
  createdAt: string;
  user?: {
    id: string;
    name?: string | null;
    email: string;
    role: string;
  } | null;
};

type AuditLogListResponse = {
  message: string;
  auditLogs: AuditLog[];
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getActionStyles(action: AuditAction) {
  const styles: Record<AuditAction, string> = {
    CREATE: "bg-green-100 text-green-700",
    UPDATE: "bg-blue-100 text-blue-700",
    DELETE: "bg-red-100 text-red-700",
    LOGIN: "bg-slate-100 text-slate-700",
    DONATION: "bg-purple-100 text-purple-700",
    DOCUMENT_UPLOAD: "bg-amber-100 text-amber-700",
    DOCUMENT_GENERATE: "bg-cyan-100 text-cyan-700",
  };

  return styles[action];
}

function getActionLabel(action: AuditAction) {
  const labels: Record<AuditAction, string> = {
    CREATE: "Creación",
    UPDATE: "Actualización",
    DELETE: "Eliminación",
    LOGIN: "Inicio de sesión",
    DONATION: "Donación",
    DOCUMENT_UPLOAD: "Carga de documento",
    DOCUMENT_GENERATE: "Documento generado",
  };

  return labels[action];
}

export default function AuditLogsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [action, setAction] = useState("");
  const [entity, setEntity] = useState("");
  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = currentUser?.role === "ADMIN";

  async function loadAuditLogs(filters?: {
    action?: string;
    entity?: string;
    userId?: string;
  }) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (filters?.action) params.append("action", filters.action);
      if (filters?.entity) params.append("entity", filters.entity);
      if (filters?.userId) params.append("userId", filters.userId);

      const query = params.toString() ? `?${params.toString()}` : "";

      const response = await apiFetch<AuditLogListResponse>(
        `/audit-logs${query}`,
        {
          auth: true,
        },
      );

      setAuditLogs(response.auditLogs);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error al cargar logs de auditoría";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUser<User>();

    setCurrentUser(user);

    if (!token) {
      setLoading(false);
      setError("Debes iniciar sesión como administrador");
      return;
    }

    if (user?.role !== "ADMIN") {
      setLoading(false);
      setError("No tienes permisos para ver los logs de auditoría");
      return;
    }

    loadAuditLogs();
  }, []);

  function handleFilter() {
    loadAuditLogs({
      action,
      entity,
      userId,
    });
  }

  function handleClearFilters() {
    setAction("");
    setEntity("");
    setUserId("");
    loadAuditLogs();
  }

  if (!storage.getToken() || !isAdmin) {
    return (
      <main className="page">
        <section className="container">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error || "No tienes permisos para acceder a esta página."}

            <div className="mt-4">
              <Link
                href="/login"
                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">
            Logs de auditoría
          </h1>
          <p className="mt-2 text-slate-600">
            Consulta la trazabilidad de acciones importantes del sistema.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Acción
              </label>

              <select
                value={action}
                onChange={(event) => setAction(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Todas</option>
                <option value="CREATE">Creación</option>
                <option value="UPDATE">Actualización</option>
                <option value="DELETE">Eliminación</option>
                <option value="LOGIN">Inicio de sesión</option>
                <option value="DONATION">Donación</option>
                <option value="DOCUMENT_UPLOAD">Carga de documento</option>
                <option value="DOCUMENT_GENERATE">Documento generado</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Entidad
              </label>

              <input
                type="text"
                value={entity}
                onChange={(event) => setEntity(event.target.value)}
                placeholder="Ej: Campaign"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Usuario ID
              </label>

              <input
                type="text"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="ID del usuario"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleFilter}
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Filtrar
              </button>

              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            Cargando logs...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && auditLogs.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            No hay logs de auditoría registrados.
          </div>
        )}

        {!loading && !error && auditLogs.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_1fr_1.4fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600 md:grid">
              <span>Acción</span>
              <span>Entidad</span>
              <span>Descripción</span>
              <span>Fecha</span>
            </div>

            <div className="divide-y divide-slate-200">
              {auditLogs.map((log) => (
                <article
                  key={log.id}
                  className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_1fr_1.4fr_1fr] md:items-center"
                >
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getActionStyles(
                        log.action,
                      )}`}
                    >
                      {getActionLabel(log.action)}
                    </span>

                    {log.user && (
                      <p className="mt-2 text-xs text-slate-500">
                        Usuario: {log.user.name || log.user.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {log.entity || "Sin entidad"}
                    </p>
                    {log.entityId && (
                      <p className="mt-1 break-all text-xs text-slate-500">
                        {log.entityId}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm leading-6 text-slate-600">
                      {log.description || "Sin descripción."}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-slate-600">
                      {formatDateTime(log.createdAt)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
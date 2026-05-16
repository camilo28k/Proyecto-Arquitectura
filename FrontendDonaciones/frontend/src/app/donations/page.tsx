"use client";

import { apiFetch } from "@/lib/api";
import { storage } from "@/lib/storage";
import { User } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";


type Donation = {
  id: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  createdAt: string;
  campaign?: {
    id: string;
    title: string;
    category?: {
      id: string;
      name: string;
    };
  };
  user?: {
    id: string;
    name?: string | null;
    email: string;
  };
};

type DonationListResponse = {
  message: string;
  donations: Donation[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function getStatusStyles(status: Donation["status"]) {
  const styles = {
    PENDING: "bg-amber-100 text-amber-700",
    COMPLETED: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
    REFUNDED: "bg-slate-100 text-slate-700",
  };

  return styles[status];
}

function getStatusLabel(status: Donation["status"]) {
  const labels = {
    PENDING: "Pendiente",
    COMPLETED: "Completada",
    FAILED: "Fallida",
    REFUNDED: "Reembolsada",
  };

  return labels[status];
}

export default function DonationsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = currentUser?.role === "ADMIN";

  async function loadDonations(user?: User | null) {
    try {
      setLoading(true);
      setError("");

      const endpoint =
        user?.role === "ADMIN" ? "/donations" : "/donations/my-donations";

      const response = await apiFetch<DonationListResponse>(endpoint, {
        auth: true,
      });

      setDonations(response.donations);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar donaciones";

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
      setError("Debes iniciar sesión para ver tus donaciones");
      return;
    }

    loadDonations(user);
  }, []);

  return (
    <main className="page">
      <section className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              {isAdmin ? "Donaciones del sistema" : "Mis donaciones"}
            </h1>

            <p className="mt-2 text-slate-600">
              {isAdmin
                ? "Consulta todas las donaciones registradas en la plataforma."
                : "Consulta el historial de tus donaciones realizadas."}
            </p>
          </div>

          <Link
            href="/campaigns"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Ver campañas
          </Link>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            Cargando donaciones...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}

            {!storage.getToken() && (
              <div className="mt-4">
                <Link
                  href="/login"
                  className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Iniciar sesión
                </Link>
              </div>
            )}
          </div>
        )}

        {!loading && !error && donations.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            No hay donaciones registradas.
          </div>
        )}

        {!loading && !error && donations.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600 md:grid">
              <span>Campaña</span>
              <span>Monto</span>
              <span>Estado</span>
              <span>Fecha</span>
            </div>

            <div className="divide-y divide-slate-200">
              {donations.map((donation) => (
                <article
                  key={donation.id}
                  className="grid gap-3 px-5 py-4 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-950">
                      {donation.campaign?.title || "Campaña no disponible"}
                    </p>

                    {donation.campaign?.category && (
                      <p className="mt-1 text-xs text-slate-500">
                        {donation.campaign.category.name}
                      </p>
                    )}

                    {isAdmin && donation.user && (
                      <p className="mt-1 text-xs text-slate-500">
                        Donante: {donation.user.name || donation.user.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatCurrency(donation.amount)}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                        donation.status,
                      )}`}
                    >
                      {getStatusLabel(donation.status)}
                    </span>
                  </div>

                  <div>
                    <span className="text-sm text-slate-600">
                      {formatDate(donation.createdAt)}
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
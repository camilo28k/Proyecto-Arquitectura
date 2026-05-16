"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { campaignService } from "@/services/campaign.service";
import { documentService } from "@/services/document.service";
import { apiFetch } from "@/lib/api";
import { storage } from "@/lib/storage";
import { Campaign } from "@/types/campaign";
import { User } from "@/types/user";

type Donation = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  user?: {
    id: string;
    name?: string | null;
    email: string;
  };
};

type CampaignDocument = {
  id: string;
  title: string;
  description?: string | null;
  type?: "UPLOADED" | "GENERATED";
  fileUrl?: string | null;
  fileName?: string | null;
  createdAt: string;
};

type CampaignDetail = Campaign & {
  donations?: Donation[];
  documents?: CampaignDocument[];
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

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
  const [donationAmount, setDonationAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  const [error, setError] = useState("");
  const [donationError, setDonationError] = useState("");
  const [donationSuccess, setDonationSuccess] = useState("");
  const [reportError, setReportError] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");

  async function loadCampaign() {
    try {
      setLoading(true);
      setError("");

      const user = storage.getUser<User>();
      setCurrentUser(user);

      const response = await campaignService.findOne(params.id);
      const loadedCampaign = response.campaign as CampaignDetail;

      const isAdmin = user?.role === "ADMIN";
      const isOwner = user?.id === loadedCampaign.userId;
      const canManageCampaign = isAdmin || isOwner;

      /*
        Importante:
        - GET /campaigns/:id debe traer solo documentos UPLOADED desde backend.
        - Si es admin o dueño, aquí cargamos todos los documentos con /documents/campaign/:id,
          incluyendo los GENERATED.
      */
      if (canManageCampaign) {
        try {
          const documentsResponse = await documentService.findByCampaign(
            params.id,
          );

          loadedCampaign.documents = documentsResponse.documents;
        } catch {
          loadedCampaign.documents = loadedCampaign.documents || [];
        }
      }

      setCampaign(loadedCampaign);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar la campaña";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.id) {
      loadCampaign();
    }
  }, [params.id]);

  async function handleDonate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = storage.getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    setDonationError("");
    setDonationSuccess("");
    setDonating(true);

    try {
      await apiFetch("/donations", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          amount: Number(donationAmount),
          campaignId: params.id,
        }),
      });

      setDonationAmount("");
      setDonationSuccess("Donación registrada correctamente");
      await loadCampaign();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al registrar la donación";

      setDonationError(message);
    } finally {
      setDonating(false);
    }
  }

  async function handleGenerateReport() {
    const token = storage.getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setGeneratingReport(true);
      setReportError("");
      setReportSuccess("");

      await documentService.generateCampaignReport(params.id);

      setReportSuccess("Reporte generado correctamente");
      await loadCampaign();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al generar el reporte";

      setReportError(message);
    } finally {
      setGeneratingReport(false);
    }
  }

  async function handleDeleteCampaign() {
    const token = storage.getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta campaña?",
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);
      setError("");

      await campaignService.remove(params.id);

      router.push("/campaigns");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al eliminar la campaña";

      setError(message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <section className="container">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            Cargando campaña...
          </div>
        </section>
      </main>
    );
  }

  if (error || !campaign) {
    return (
      <main className="page">
        <section className="container">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error || "No se encontró la campaña"}
          </div>

          <Link
            href="/campaigns"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Volver a campañas
          </Link>
        </section>
      </main>
    );
  }

  const percentage =
    campaign.goal > 0
      ? Math.min((campaign.raised / campaign.goal) * 100, 100)
      : 0;

  const isAdmin = currentUser?.role === "ADMIN";
  const isOwner = currentUser?.id === campaign.userId;
  const canManageCampaign = isAdmin || isOwner;

  const uploadedDocuments =
    campaign.documents?.filter((document) => document.type !== "GENERATED") ||
    [];

  const generatedReports =
    campaign.documents?.filter((document) => document.type === "GENERATED") ||
    [];

  return (
    <main className="page">
      <section className="container">
        <Link
          href="/campaigns"
          className="mb-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Volver a campañas
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {campaign.imageUrl ? (
                <img
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  className="h-72 w-full object-cover"
                />
              ) : (
                <div className="flex h-72 w-full items-center justify-center bg-slate-100 text-slate-500">
                  Sin imagen
                </div>
              )}

              <div className="p-6">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {campaign.category?.name || "Sin categoría"}
                </span>

                <h1 className="mt-4 text-3xl font-bold text-slate-950">
                  {campaign.title}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Creada por {campaign.user?.name || campaign.user?.email}
                </p>

                <p className="mt-6 leading-8 text-slate-700">
                  {campaign.description}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Documentos relacionados
              </h2>

              {uploadedDocuments.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">
                  Esta campaña todavía no tiene documentos públicos asociados.
                </p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {uploadedDocuments.map((document) => (
                    <div
                      key={document.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-900">
                              {document.title}
                            </h3>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              Subido
                            </span>
                          </div>

                          {document.description && (
                            <p className="mt-1 text-sm text-slate-600">
                              {document.description}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-slate-500">
                            {formatDate(document.createdAt)}
                          </p>

                          {document.fileName && (
                            <p className="mt-1 text-xs text-slate-500">
                              Archivo: {document.fileName}
                            </p>
                          )}
                        </div>

                        {document.fileUrl && (
                          <a
                            href={document.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Ver archivo
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {canManageCampaign && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">
                  Reportes privados
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Estos reportes solo los puede ver el administrador o el dueño
                  de la campaña.
                </p>

                {generatedReports.length === 0 ? (
                  <p className="mt-3 text-sm text-slate-600">
                    Todavía no hay reportes generados.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-3">
                    {generatedReports.map((document) => (
                      <div
                        key={document.id}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-slate-900">
                                {document.title}
                              </h3>

                              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                Generado
                              </span>
                            </div>

                            {document.description && (
                              <p className="mt-1 text-sm text-slate-600">
                                {document.description}
                              </p>
                            )}

                            <p className="mt-2 text-xs text-slate-500">
                              {formatDate(document.createdAt)}
                            </p>

                            {document.fileName && (
                              <p className="mt-1 text-xs text-slate-500">
                                Archivo: {document.fileName}
                              </p>
                            )}
                          </div>

                          {document.fileUrl && (
                            <a
                              href={document.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Ver reporte
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Progreso de la campaña
            </h2>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-slate-800">
                  {formatCurrency(campaign.raised)}
                </span>

                <span className="text-slate-500">
                  {formatCurrency(campaign.goal)}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {percentage.toFixed(1)}% recaudado
              </p>
            </div>

            <form onSubmit={handleDonate} className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Monto a donar
              </label>

              <input
                type="number"
                min="1"
                value={donationAmount}
                onChange={(event) => setDonationAmount(event.target.value)}
                required
                placeholder="Ej: 50000"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {donationError && (
                <p className="mt-3 text-sm text-red-600">{donationError}</p>
              )}

              {donationSuccess && (
                <p className="mt-3 text-sm text-green-600">
                  {donationSuccess}
                </p>
              )}

              <button
                type="submit"
                disabled={donating}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:hover:bg-blue-600"
              >
                {donating ? "Registrando..." : "Donar"}
              </button>
            </form>

            {canManageCampaign && (
              <Link
                href="/documents"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Subir documento
              </Link>
            )}

            {canManageCampaign && (
              <div className="mt-3 grid gap-3">
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  disabled={generatingReport}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {generatingReport
                    ? "Generando reporte..."
                    : "Generar reporte PDF"}
                </button>

                {reportSuccess && (
                  <p className="text-sm text-green-600">{reportSuccess}</p>
                )}

                {reportError && (
                  <p className="text-sm text-red-600">{reportError}</p>
                )}

                <button
                  type="button"
                  onClick={handleDeleteCampaign}
                  disabled={deleting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? "Eliminando..." : "Eliminar campaña"}
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
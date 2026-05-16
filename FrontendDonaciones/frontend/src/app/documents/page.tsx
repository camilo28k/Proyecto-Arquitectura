"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loading } from "@/components/ui/Loading";
import {
  DocumentForm,
  DocumentFormValues,
} from "@/components/forms/DocumentForm";
import { campaignService } from "@/services/campaign.service";
import { documentService } from "@/services/document.service";
import { storage } from "@/lib/storage";
import { Campaign } from "@/types/campaign";
import { CampaignDocument } from "@/types/document";
import { User } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import { handleError } from "@/utils/handleError";

function formatFileSize(size?: number | null): string {
  if (!size) return "Tamaño no disponible";

  if (size < 1024) return `${size} B`;

  const kb = size / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [documents, setDocuments] = useState<CampaignDocument[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isAdmin = currentUser?.role === "ADMIN";

  async function loadDocuments(user?: User | null) {
    try {
      setLoadingDocuments(true);
      setError("");

      const response =
        user?.role === "ADMIN"
          ? await documentService.findAll()
          : await documentService.findMyDocuments();

      setDocuments(response.documents);
    } catch (error) {
      setError(handleError(error, "Error al cargar documentos"));
    } finally {
      setLoadingDocuments(false);
    }
  }

  async function loadCampaigns() {
    try {
      setLoadingCampaigns(true);

      const response = await campaignService.findAll();
      setCampaigns(response.campaigns);
    } catch {
      setCampaigns([]);
    } finally {
      setLoadingCampaigns(false);
    }
  }

  useEffect(() => {
    setMounted(true);

    const token = storage.getToken();
    const user = storage.getUser<User>();

    setIsAuthenticated(Boolean(token));
    setCurrentUser(user);

    if (!token) {
      setLoadingDocuments(false);
      setLoadingCampaigns(false);
      setError("Debes iniciar sesión para gestionar documentos");
      return;
    }

    loadDocuments(user);
    loadCampaigns();
  }, []);

  async function handleUpload(data: DocumentFormValues) {
    try {
      setUploading(true);
      setError("");
      setSuccess("");

      await documentService.create({
        title: data.title,
        description: data.description,
        campaignId: data.campaignId,
        type: data.type,
        file: data.file,
      });

      setSuccess("Documento subido correctamente");
      await loadDocuments(currentUser);
    } catch (error) {
      setError(handleError(error, "Error al subir el documento"));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este documento?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      await documentService.remove(id);

      setSuccess("Documento eliminado correctamente");
      await loadDocuments(currentUser);
    } catch (error) {
      setError(handleError(error, "Error al eliminar el documento"));
    }
  }

  if (!mounted) {
    return (
      <main className="page">
        <Container>
          <Loading message="Cargando documentos..." />
        </Container>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="page">
        <Container>
          <Card>
            <CardContent>
              <p className="text-sm text-red-600">
                Debes iniciar sesión para gestionar documentos.
              </p>

              <Link
                href="/login"
                className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Iniciar sesión
              </Link>
            </CardContent>
          </Card>
        </Container>
      </main>
    );
  }

  return (
    <main className="page">
      <Container>
        <PageHeader
          title="Documentos"
          description="Sube y consulta documentos asociados a las campañas."
        />

        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          <aside>
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold text-slate-950">
                  Subir documento
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Selecciona una campaña y carga el archivo correspondiente.
                </p>

                <div className="mt-5">
                  <DocumentForm
                    campaigns={campaigns}
                    loading={uploading}
                    loadingCampaigns={loadingCampaigns}
                    submitLabel="Subir documento"
                    onSubmit={handleUpload}
                  />
                </div>

                {error && (
                  <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    {success}
                  </p>
                )}
              </CardContent>
            </Card>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">
                {isAdmin ? "Todos los documentos" : "Mis documentos"}
              </h2>
            </div>

            {loadingDocuments && <Loading message="Cargando documentos..." />}

            {!loadingDocuments && documents.length === 0 && (
              <Card>
                <CardContent>
                  <p className="text-center text-sm text-slate-600">
                    No hay documentos registrados.
                  </p>
                </CardContent>
              </Card>
            )}

            {!loadingDocuments && documents.length > 0 && (
              <div className="grid gap-4">
                {documents.map((document) => (
                  <Card key={document.id}>
                    <CardContent>
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold text-slate-950">
                              {document.title}
                            </h3>

                            <Badge
                              variant={
                                document.type === "UPLOADED"
                                  ? "primary"
                                  : "warning"
                              }
                            >
                              {document.type === "UPLOADED"
                                ? "Subido"
                                : "Generado"}
                            </Badge>
                          </div>

                          <p className="text-sm text-slate-600">
                            {document.description || "Sin descripción."}
                          </p>

                          <div className="mt-3 grid gap-1 text-xs text-slate-500">
                            <span>
                              Campaña:{" "}
                              {document.campaign?.title || "No disponible"}
                            </span>

                            <span>
                              Archivo:{" "}
                              {document.fileName || "Nombre no disponible"}
                            </span>

                            <span>{formatFileSize(document.size)}</span>

                            <span>Fecha: {formatDate(document.createdAt)}</span>

                            {isAdmin && document.uploadedBy && (
                              <span>
                                Subido por:{" "}
                                {document.uploadedBy.name ||
                                  document.uploadedBy.email}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
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

                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(document.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
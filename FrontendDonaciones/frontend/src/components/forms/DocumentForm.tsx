"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Campaign } from "@/types/campaign";

export type DocumentType = "UPLOADED" | "GENERATED";

export type DocumentFormValues = {
  title: string;
  description?: string;
  campaignId: string;
  type: DocumentType;
  file: File;
};

type DocumentFormProps = {
  campaigns: Campaign[];
  loading?: boolean;
  loadingCampaigns?: boolean;
  submitLabel?: string;
  onSubmit: (data: DocumentFormValues) => Promise<void> | void;
};

export function DocumentForm({
  campaigns,
  loading = false,
  loadingCampaigns = false,
  submitLabel = "Subir documento",
  onSubmit,
}: DocumentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [type, setType] = useState<DocumentType>("UPLOADED");
  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setCampaignId("");
    setType("UPLOADED");
    setFile(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (!campaignId) {
      setError("Debes seleccionar una campaña");
      return;
    }

    if (!file) {
      setError("Debes seleccionar un archivo");
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      campaignId,
      type,
      file,
    });

    resetForm();
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <Input
        label="Título"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ej: Documento de soporte"
        required
      />

      <Textarea
        label="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={4}
        placeholder="Descripción opcional"
      />

      <Select
        label="Campaña"
        value={campaignId}
        onChange={(event) => setCampaignId(event.target.value)}
        required
        disabled={loadingCampaigns}
        placeholder={
          loadingCampaigns ? "Cargando campañas..." : "Selecciona una campaña"
        }
        options={campaigns.map((campaign) => ({
          label: campaign.title,
          value: campaign.id,
        }))}
      />

      <Select
        label="Tipo de documento"
        value={type}
        onChange={(event) => setType(event.target.value as DocumentType)}
        options={[
          {
            label: "Subido",
            value: "UPLOADED",
          },
          {
            label: "Generado",
            value: "GENERATED",
          },
        ]}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Archivo
        </label>

        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />

        {file && (
          <p className="mt-2 text-xs text-slate-500">
            Archivo seleccionado: {file.name}
          </p>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? "Subiendo..." : submitLabel}
      </Button>
    </form>
  );
}
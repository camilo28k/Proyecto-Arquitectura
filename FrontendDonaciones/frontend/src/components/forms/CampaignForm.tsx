"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { CreateCampaignRequest, UpdateCampaignRequest } from "@/types/campaign";
import { Category } from "@/types/category";

type CampaignFormValues = CreateCampaignRequest | UpdateCampaignRequest;

type CampaignFormProps = {
  categories: Category[];
  initialValues?: Partial<CampaignFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (data: CreateCampaignRequest) => Promise<void> | void;
};

export function CampaignForm({
  categories,
  initialValues,
  loading = false,
  submitLabel = "Guardar campaña",
  onSubmit,
}: CampaignFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );
  const [goal, setGoal] = useState(
    initialValues?.goal ? String(initialValues.goal) : "",
  );
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || "");

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    if (!goal || Number(goal) <= 0) {
      setError("La meta debe ser mayor a 0");
      return;
    }

    if (!categoryId) {
      setError("Debes seleccionar una categoría");
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      goal: Number(goal),
      imageUrl: imageUrl.trim() || undefined,
      categoryId,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <Input
        label="Título"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ej: Ayuda para medicamentos"
        required
      />

      <Textarea
        label="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe el objetivo de la campaña"
        rows={5}
        required
      />

      <Input
        label="Meta de recaudación"
        type="number"
        min={1}
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
        placeholder="Ej: 5000000"
        required
      />

      <Input
        label="Imagen de portada"
        type="url"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        placeholder="https://ejemplo.com/imagen.jpg"
      />

      <Select
        label="Categoría"
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
        required
        placeholder="Selecciona una categoría"
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />

      {error && <p className="error-text">{error}</p>}

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}
"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export type CategoryFormValues = {
  name: string;
  description?: string;
};

type CategoryFormProps = {
  initialValues?: Partial<CategoryFormValues>;
  loading?: boolean;
  disabled?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit: (data: CategoryFormValues) => Promise<void> | void;
};

export function CategoryForm({
  initialValues,
  loading = false,
  disabled = false,
  submitLabel = "Guardar categoría",
  onCancel,
  onSubmit,
}: CategoryFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre de la categoría es obligatorio");
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <Input
        label="Nombre"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ej: Health"
        required
        disabled={disabled}
      />

      <Textarea
        label="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descripción de la categoría"
        rows={4}
        disabled={disabled}
      />

      {error && <p className="error-text">{error}</p>}

      <Button type="submit" fullWidth disabled={loading || disabled}>
        {loading ? "Guardando..." : submitLabel}
      </Button>

      {onCancel && (
        <Button
          type="button"
          variant="outline"
          fullWidth
          disabled={loading}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      )}
    </form>
  );
}
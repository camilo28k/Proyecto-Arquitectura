"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export type DonationFormValues = {
  amount: number;
};

type DonationFormProps = {
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (data: DonationFormValues) => Promise<void> | void;
};

export function DonationForm({
  loading = false,
  submitLabel = "Donar",
  onSubmit,
}: DonationFormProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!amount || Number(amount) <= 0) {
      setError("El monto debe ser mayor a 0");
      return;
    }

    await onSubmit({
      amount: Number(amount),
    });

    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <Input
        label="Monto a donar"
        type="number"
        min={1}
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Ej: 50000"
        required
      />

      {error && <p className="error-text">{error}</p>}

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? "Registrando..." : submitLabel}
      </Button>
    </form>
  );
}
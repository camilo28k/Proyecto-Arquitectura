"use client";

import { useEffect, useState } from "react";
import CampaignCard from "../campaign-card/campaign-card";
import {
  createCampaign,
  deleteCampaign,
  getCampaigns,
  updateCampaignProgress,
} from "../../services/campaign.service";
import { CAMPAIGN_CATEGORIES } from "../../config/campaign.config";
import type {
  Campaign,
  CampaignCategory,
  CampaignFormInput,
} from "../../types/campaign.types";
import { useAuthStore } from "@/features/auth/store/auth.store";

type CampaignBoardProps = {
  category: CampaignCategory;
};

const INITIAL_FORM: CampaignFormInput = {
  title: "",
  description: "",
  goal: 0,
  raised: 0,
};

export default function CampaignBoard({ category }: CampaignBoardProps) {
  const config = CAMPAIGN_CATEGORIES[category];
  const { user } = useAuthStore();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState<CampaignFormInput>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    loadCampaigns();
  }, [category]);

  async function loadCampaigns() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getCampaigns(category);
      setCampaigns(data);
    } catch {
      setError("No se pudieron cargar las campañas");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || form.goal <= 0) {
      setError("Completa todos los campos correctamente");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const newCampaign = await createCampaign(category, form);

      setCampaigns((prev) => [newCampaign, ...prev]);
      setForm(INITIAL_FORM);
    } catch {
      setError("No se pudo crear la campaña");
    } finally {
      setIsLoading(false);
    }
  }

  // 🔥 ahora recibe amount directamente desde la card
  async function handleDonate(campaign: Campaign, amount: number) {
    try {
      setError("");

      const updatedCampaign = await updateCampaignProgress(
        category,
        campaign,
        amount
      );

      setCampaigns((prev) =>
        prev.map((item) =>
          item.id === campaign.id ? updatedCampaign : item
        )
      );
    } catch {
      setError("No se pudo registrar el aporte");
    }
  }

  async function handleDelete(campaign: Campaign) {
  try {
    await deleteCampaign(category, campaign);

    setCampaigns((prev) =>
      prev.filter((item) => item.id !== campaign.id)
    );
  } catch {
    setError("No se pudo eliminar la campaña");
  }
}

  return (
    <section className="space-y-6">
      {/* FORMULARIO */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            {config.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {config.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Título de la campaña"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500"
          />

          <textarea
            placeholder="Descripción"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="min-h-24 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500"
          />

          <input
            type="number"
            placeholder="Meta"
            value={form.goal || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                goal: Number(e.target.value),
              }))
            }
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-gray-950 px-4 py-2 font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {isLoading ? "Cargando..." : "Crear campaña"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      {/* LISTADO */}
      {isLoading && campaigns.length === 0 && (
        <p className="text-sm text-gray-500">Cargando campañas...</p>
      )}

      {!isLoading && campaigns.length === 0 && (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
          Todavía no hay campañas en esta categoría.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id ?? campaign.title}
            campaign={campaign}
            category={category}
            currentUserId={user?.id}
            isAdmin={isAdmin}
            onDonate={handleDonate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
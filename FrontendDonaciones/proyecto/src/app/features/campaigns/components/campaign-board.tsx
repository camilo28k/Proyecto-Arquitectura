"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CAMPAIGN_CATEGORIES } from "../campaign.config";
import {
  Campaign,
  CampaignCategory,
  CampaignFormInput,
} from "../campaign.types";
import {
  createCampaign,
  deleteCampaign,
  getCampaigns,
  updateCampaignProgress,
} from "@/app/services/campaign.service";
import { useAuthStore } from "@/app/stores/auth.store";

type Props = {
  category: CampaignCategory;
};

const initialForm: CampaignFormInput = {
  title: "",
  description: "",
  goal: 0,
  raised: 0,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function progressPercent(campaign: Campaign) {
  if (!campaign.goal) return 0;
  return Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
}

export default function CampaignBoard({ category }: Props) {
  const config = CAMPAIGN_CATEGORIES[category];
  const { user } = useAuthStore();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState<CampaignFormInput>(initialForm);
  const [donationAmounts, setDonationAmounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const totals = useMemo(() => {
    return campaigns.reduce(
      (acc, campaign) => ({
        goal: acc.goal + Number(campaign.goal || 0),
        raised: acc.raised + Number(campaign.raised || 0),
      }),
      { goal: 0, raised: 0 }
    );
  }, [campaigns]);

  useEffect(() => {
    async function loadCampaigns() {
      setIsLoading(true);
      const data = await getCampaigns(category);
      setCampaigns(data);
      setIsLoading(false);
    }
    loadCampaigns();
  }, [category]);

  function updateForm<K extends keyof CampaignFormInput>(
    key: K,
    value: CampaignFormInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    const created = await createCampaign(category, form);
    setCampaigns((prev) => [created, ...prev]);
    setForm(initialForm);

    setIsSaving(false);
  }

  async function handleDonate(campaign: Campaign) {
    const key = campaign.id ?? campaign.title;
    const amount = donationAmounts[key] || 0;
    if (!amount) return;

    const updated = await updateCampaignProgress(category, campaign, amount);

    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaign.id ? updated : c))
    );

    setDonationAmounts((prev) => ({ ...prev, [key]: 0 }));
  }

  async function handleDelete(campaign: Campaign) {
    await deleteCampaign(category, campaign);
    setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
  }

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <div className="rounded-2xl bg-gray-950 p-6 text-white shadow-sm">
            <div className={`mb-4 h-1 w-20 rounded-full ${config.accent}`} />
            <h2 className="text-3xl font-bold">{config.title}</h2>
            <p className="mt-2 text-sm text-gray-300">
              {config.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Campañas" value={campaigns.length} />
            <StatCard title="Meta total" value={formatCurrency(totals.goal)} />
            <StatCard title="Recaudado" value={formatCurrency(totals.raised)} />
          </div>
        </div>

        <form
          onSubmit={handleCreate}
          className="h-fit rounded-2xl border bg-white p-6 shadow-sm space-y-4"
        >
          <h3 className="text-xl font-bold">Nueva campaña</h3>

          <input
            placeholder="Título"
            value={form.title}
            onChange={(e) => updateForm("title", e.target.value)}
            className="input"
          />

          <textarea
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => updateForm("description", e.target.value)}
            className="input h-24"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Meta"
              value={form.goal || ""}
              onChange={(e) => updateForm("goal", Number(e.target.value))}
              className="input"
            />

            <input
              type="number"
              placeholder="Inicial"
              value={form.raised || ""}
              onChange={(e) => updateForm("raised", Number(e.target.value))}
              className="input"
            />
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg">
            {isSaving ? "Creando..." : "Crear campaña"}
          </button>
        </form>
      </div>

      <div className="space-y-5">
        <h3 className="text-2xl font-bold">Campañas activas</h3>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {campaigns.map((c) => {
  const key = c.id ?? c.title;
  const percent = progressPercent(c);

  const campaignUserId = String(c.userId).trim();
  const currentUserId = String(user?.id).trim();

  const isAdmin = user?.role === "ADMIN";
const isOwner = campaignUserId === currentUserId;

const canDelete = isOwner || isAdmin;

  return (
    <div key={key} className="card">
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold">{c.title}</h4>
          <p className="text-sm text-gray-500">{c.description}</p>
        </div>
        <span>{percent}%</span>
      </div>

      <div className="h-2 bg-gray-200 rounded mt-3">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="number"
          placeholder="Aporte"
          value={donationAmounts[key] || ""}
          onChange={(e) =>
            setDonationAmounts((prev) => ({
              ...prev,
              [key]: Number(e.target.value),
            }))
          }
          className="input"
        />

        {/* ✅ TODOS pueden aportar */}
        <button
          type="button"
          onClick={() => handleDonate(c)}
          className="bg-yellow-400 px-4 rounded"
        >
          Aportar
        </button>

        {/* ❌ SOLO dueño elimina */}
        {canDelete && (
  <button
    type="button"
    onClick={() => handleDelete(c)}
    className="border px-4 rounded"
  >
    Eliminar
  </button>
)}
      </div>
    </div>
  );
})}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
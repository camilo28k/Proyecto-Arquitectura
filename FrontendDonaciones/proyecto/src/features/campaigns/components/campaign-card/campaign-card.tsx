"use client";

import { useState } from "react";
import type { Campaign, CampaignCategory } from "../../types/campaign.types";

type CampaignCardProps = {
  campaign: Campaign;
  category: CampaignCategory;
  currentUserId?: string;
  isAdmin?: boolean;
  onDonate: (campaign: Campaign, amount: number) => void;
  onDelete: (campaign: Campaign) => void;
};

export default function CampaignCard({
  campaign,
  currentUserId,
  isAdmin,
  onDonate,
  onDelete,
}: CampaignCardProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const progress =
    campaign.goal > 0 ? Math.min((campaign.raised / campaign.goal) * 100, 100) : 0;

  const canDelete = isAdmin || campaign.userId === currentUserId;

  function handleDonate() {
    const value = Number(amount);

    if (!value || value <= 0) {
      setError("Ingresa un aporte válido");
      return;
    }

    onDonate(campaign, value);
    setAmount("");
    setError("");
  }

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{campaign.description}</p>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm text-gray-600">
            <span>Recaudado: ${campaign.raised}</span>
            <span>Meta: ${campaign.goal}</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor aporte"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 sm:w-40"
          />

          <button
            type="button"
            onClick={handleDonate}
            className="rounded-md bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Aportar
          </button>

          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(campaign)}
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Eliminar
            </button>
          )}
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      </div>
    </article>
  );
}
"use client";

import { campaignService } from "@/services/campaign.service";
import { categoryService } from "@/services/category.service";
import { Campaign } from "@/types/campaign";
import { Category } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";


function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCampaigns(category?: string) {
    try {
      setLoading(true);
      setError("");

      const response = await campaignService.findAll(category);
      setCampaigns(response.campaigns);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar campañas";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const response = await categoryService.findAll();
      setCategories(response.categories);
    } catch {
      setCategories([]);
    }
  }

  useEffect(() => {
    loadCampaigns();
    loadCategories();
  }, []);

  function handleCategoryChange(value: string) {
    setSelectedCategory(value);
    loadCampaigns(value || undefined);
  }

  return (
    <main className="page">
      <section className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Campañas</h1>
            <p className="mt-2 text-slate-600">
              Explora las campañas disponibles y apoya las causas que más te
              interesen.
            </p>
          </div>

          <Link
            href="/campaigns/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Crear campaña
          </Link>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Filtrar por categoría
          </label>

          <select
            value={selectedCategory}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:max-w-sm"
          >
            <option value="">Todas las categorías</option>

            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            Cargando campañas...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && campaigns.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
            No hay campañas disponibles.
          </div>
        )}

        {!loading && !error && campaigns.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => {
              const percentage =
                campaign.goal > 0
                  ? Math.min((campaign.raised / campaign.goal) * 100, 100)
                  : 0;

              return (
                <article
                  key={campaign.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {campaign.imageUrl ? (
                    <img
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                      Sin imagen
                    </div>
                  )}

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {campaign.category?.name || "Sin categoría"}
                      </span>
                    </div>

                    <h2 className="line-clamp-2 text-lg font-bold text-slate-950">
                      {campaign.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                      {campaign.description}
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          {formatCurrency(campaign.raised)}
                        </span>
                        <span className="text-slate-500">
                          Meta: {formatCurrency(campaign.goal)}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
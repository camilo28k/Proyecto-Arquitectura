"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";
import { storage } from "@/lib/storage";
import { categoryService } from "@/services/category.service";
import { campaignService } from "@/services/campaign.service";


export default function CreateCampaignPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = storage.getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    async function loadCategories() {
      try {
        setLoadingCategories(true);
        const response = await categoryService.findAll();
        setCategories(response.categories);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al cargar categorías";

        setError(message);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await campaignService.create({
        title,
        description,
        goal: Number(goal),
        imageUrl: imageUrl || undefined,
        categoryId,
      });

      router.push(`/campaigns/${response.campaign.id}`);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear la campaña";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-950">
              Crear campaña
            </h1>
            <p className="mt-2 text-slate-600">
              Completa la información principal de tu campaña.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form-grid rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Título
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                placeholder="Ej: Ayuda para medicamentos"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Descripción
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={5}
                placeholder="Describe el objetivo de la campaña"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Meta de recaudación
              </label>

              <input
                type="number"
                min="1"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                required
                placeholder="Ej: 5000000"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Imagen de portada
              </label>

              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Categoría
              </label>

              <select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                required
                disabled={loadingCategories}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  {loadingCategories
                    ? "Cargando categorías..."
                    : "Selecciona una categoría"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:hover:bg-blue-600"
            >
              {loading ? "Creando campaña..." : "Crear campaña"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
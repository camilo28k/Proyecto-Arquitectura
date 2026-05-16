"use client";

import { FormEvent, useEffect, useState } from "react";
import { Category } from "@/types/category";
import { User } from "@/types/user";
import { storage } from "@/lib/storage";
import { categoryService } from "@/services/category.service";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isAdmin = currentUser?.role === "ADMIN";

  async function loadCategories() {
    try {
      setLoading(true);
      setError("");

      const response = await categoryService.findAll();
      setCategories(response.categories);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar categorías";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const user = storage.getUser<User>();
    setCurrentUser(user);

    loadCategories();
  }, []);

  function resetForm() {
    setName("");
    setDescription("");
    setEditingCategoryId(null);
  }

  function startEdit(category: Category) {
    setEditingCategoryId(category.id);
    setName(category.name);
    setDescription(category.description || "");
    setSuccess("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin) {
      setError("Solo el administrador puede gestionar categorías");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingCategoryId) {
        await categoryService.update(editingCategoryId, {
          name,
          description,
        });

        setSuccess("Categoría actualizada correctamente");
      } else {
        await categoryService.create({
          name,
          description,
        });

        setSuccess("Categoría creada correctamente");
      }

      resetForm();
      await loadCategories();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al guardar la categoría";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!isAdmin) {
      setError("Solo el administrador puede eliminar categorías");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta categoría?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      await categoryService.remove(id);

      setSuccess("Categoría eliminada correctamente");
      await loadCategories();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al eliminar la categoría";

      setError(message);
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">Categorías</h1>
          <p className="mt-2 text-slate-600">
            Gestiona las categorías usadas para clasificar las campañas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              {editingCategoryId ? "Editar categoría" : "Nueva categoría"}
            </h2>

            {!isAdmin && (
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                Solo el administrador puede crear, editar o eliminar categorías.
              </p>
            )}

            <form onSubmit={handleSubmit} className="form-grid mt-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nombre
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  disabled={!isAdmin}
                  placeholder="Ej: Health"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Descripción
                </label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled={!isAdmin}
                  rows={4}
                  placeholder="Descripción de la categoría"
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />
              </div>

              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <button
                type="submit"
                disabled={saving || !isAdmin}
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:hover:bg-blue-600"
              >
                {saving
                  ? "Guardando..."
                  : editingCategoryId
                    ? "Actualizar categoría"
                    : "Crear categoría"}
              </button>

              {editingCategoryId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar edición
                </button>
              )}
            </form>
          </aside>

          <div>
            {loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
                Cargando categorías...
              </div>
            )}

            {!loading && categories.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
                No hay categorías registradas.
              </div>
            )}

            {!loading && categories.length > 0 && (
              <div className="grid gap-4">
                {categories.map((category) => (
                  <article
                    key={category.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div>
                        <h2 className="text-lg font-bold text-slate-950">
                          {category.name}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {category.description ||
                            "Sin descripción registrada."}
                        </p>
                      </div>

                      {isAdmin && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(category)}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(category.id)}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import { Category } from "@/types/category";
import { categoryService, CreateCategoryRequest, UpdateCategoryRequest } from "@/services/category.service";

type UseCategoriesOptions = {
  autoLoad?: boolean;
};

export function useCategories(options: UseCategoriesOptions = {}) {
  const { autoLoad = true } = options;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findAll = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await categoryService.findAll();
      setCategories(response.categories);

      return response.categories;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar categorías";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  async function findOne(id: string) {
    try {
      setLoading(true);
      setError("");

      const response = await categoryService.findOne(id);
      setSelectedCategory(response.category);

      return response.category;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar la categoría";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function create(data: CreateCategoryRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await categoryService.create(data);

      setCategories((prev) => [response.category, ...prev]);

      return response.category;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear la categoría";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function update(id: string, data: UpdateCategoryRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await categoryService.update(id, data);

      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? response.category : category,
        ),
      );

      setSelectedCategory(response.category);

      return response.category;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al actualizar la categoría";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    try {
      setLoading(true);
      setError("");

      await categoryService.remove(id);

      setCategories((prev) => prev.filter((category) => category.id !== id));

      if (selectedCategory?.id === id) {
        setSelectedCategory(null);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al eliminar la categoría";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoLoad) {
      findAll();
    }
  }, [autoLoad, findAll]);

  return {
    categories,
    selectedCategory,
    loading,
    error,
    findAll,
    findOne,
    create,
    update,
    remove,
    setCategories,
    setSelectedCategory,
  };
}
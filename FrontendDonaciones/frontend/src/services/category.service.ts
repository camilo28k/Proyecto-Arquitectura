import { apiFetch } from "@/lib/api";
import { Category } from "@/types/category";


export type CreateCategoryRequest = {
  name: string;
  description?: string;
};

export type UpdateCategoryRequest = {
  name?: string;
  description?: string;
};

type CategoryListResponse = {
  message: string;
  categories: Category[];
};

type CategoryResponse = {
  message: string;
  category: Category;
};

export const categoryService = {
  findAll(): Promise<CategoryListResponse> {
    return apiFetch<CategoryListResponse>("/categories");
  },

  findOne(id: string): Promise<CategoryResponse> {
    return apiFetch<CategoryResponse>(`/categories/${id}`);
  },

  create(data: CreateCategoryRequest): Promise<CategoryResponse> {
    return apiFetch<CategoryResponse>("/categories", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: UpdateCategoryRequest): Promise<CategoryResponse> {
    return apiFetch<CategoryResponse>(`/categories/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  remove(id: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/categories/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Category } from "@/types/category";

type CategoryListProps = {
  categories: Category[];
  loading?: boolean;
  error?: string;
  isAdmin?: boolean;
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => void;
};

export function CategoryList({
  categories,
  loading = false,
  error = "",
  isAdmin = false,
  onEdit,
  onDelete,
}: CategoryListProps) {
  if (loading) {
    return <Loading message="Cargando categorías..." />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
        No hay categorías registradas.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  {category.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {category.description || "Sin descripción registrada."}
                </p>
              </div>

              {isAdmin && (
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(category)}
                    >
                      Editar
                    </Button>
                  )}

                  {onDelete && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(category.id)}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
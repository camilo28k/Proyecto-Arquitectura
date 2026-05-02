export function formatDate(date?: string) {
  if (!date) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
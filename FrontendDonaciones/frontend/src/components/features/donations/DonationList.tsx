import { Badge } from "@/components/ui/Badge";
import { Loading } from "@/components/ui/Loading";

export type DonationStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type DonationItem = {
  id: string;
  amount: number;
  status: DonationStatus;
  createdAt: string;
  campaign?: {
    id: string;
    title: string;
    category?: {
      id: string;
      name: string;
    };
  };
  user?: {
    id: string;
    name?: string | null;
    email: string;
  };
};

type DonationListProps = {
  donations: DonationItem[];
  loading?: boolean;
  error?: string;
  isAdmin?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function getStatusVariant(status: DonationStatus) {
  const variants = {
    PENDING: "warning",
    COMPLETED: "success",
    FAILED: "danger",
    REFUNDED: "neutral",
  } as const;

  return variants[status];
}

function getStatusLabel(status: DonationStatus) {
  const labels: Record<DonationStatus, string> = {
    PENDING: "Pendiente",
    COMPLETED: "Completada",
    FAILED: "Fallida",
    REFUNDED: "Reembolsada",
  };

  return labels[status];
}

export function DonationList({
  donations,
  loading = false,
  error = "",
  isAdmin = false,
}: DonationListProps) {
  if (loading) {
    return <Loading message="Cargando donaciones..." />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
        No hay donaciones registradas.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600 md:grid">
        <span>Campaña</span>
        <span>Monto</span>
        <span>Estado</span>
        <span>Fecha</span>
      </div>

      <div className="divide-y divide-slate-200">
        {donations.map((donation) => (
          <article
            key={donation.id}
            className="grid gap-3 px-5 py-4 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center"
          >
            <div>
              <p className="font-semibold text-slate-950">
                {donation.campaign?.title || "Campaña no disponible"}
              </p>

              {donation.campaign?.category && (
                <p className="mt-1 text-xs text-slate-500">
                  {donation.campaign.category.name}
                </p>
              )}

              {isAdmin && donation.user && (
                <p className="mt-1 text-xs text-slate-500">
                  Donante: {donation.user.name || donation.user.email}
                </p>
              )}
            </div>

            <div>
              <span className="text-sm font-semibold text-slate-900">
                {formatCurrency(donation.amount)}
              </span>
            </div>

            <div>
              <Badge variant={getStatusVariant(donation.status)}>
                {getStatusLabel(donation.status)}
              </Badge>
            </div>

            <div>
              <span className="text-sm text-slate-600">
                {formatDate(donation.createdAt)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
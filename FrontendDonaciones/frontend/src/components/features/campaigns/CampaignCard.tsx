import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Campaign } from "@/types/campaign";

type CampaignCardProps = {
  campaign: Campaign;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const percentage =
    campaign.goal > 0
      ? Math.min((campaign.raised / campaign.goal) * 100, 100)
      : 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-44 w-full bg-slate-100">
        {campaign.imageUrl ? (
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <Badge variant="primary">
            {campaign.category?.name || "Sin categoría"}
          </Badge>
        </div>

        <h2 className="line-clamp-2 text-lg font-bold text-slate-950">
          {campaign.title}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {campaign.description}
        </p>

        <div className="mt-5">
          <div className="mb-2 flex justify-between gap-3 text-sm">
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

          <p className="mt-2 text-xs text-slate-500">
            {percentage.toFixed(1)}% recaudado
          </p>
        </div>

        <div className="mt-5">
          <ButtonLink href={`/campaigns/${campaign.id}`} variant="outline" fullWidth>
            Ver detalle
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
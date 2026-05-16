import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { DonationForm } from "@/components/forms/DonationForm";
import { Campaign } from "@/types/campaign";

type Donation = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  user?: {
    id: string;
    name?: string | null;
    email: string;
  };
};

type CampaignDocument = {
  id: string;
  title: string;
  description?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  createdAt: string;
};

export type CampaignDetailData = Campaign & {
  donations?: Donation[];
  documents?: CampaignDocument[];
};

type CampaignDetailProps = {
  campaign: CampaignDetailData;
  donating?: boolean;
  donationError?: string;
  donationSuccess?: string;
  onDonate: (data: { amount: number }) => Promise<void> | void;
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

export function CampaignDetail({
  campaign,
  donating = false,
  donationError = "",
  donationSuccess = "",
  onDonate,
}: CampaignDetailProps) {
  const percentage =
    campaign.goal > 0
      ? Math.min((campaign.raised / campaign.goal) * 100, 100)
      : 0;

  return (
    <div>
      <Link
        href="/campaigns"
        className="mb-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Volver a campañas
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Card className="overflow-hidden">
            <div className="relative h-72 w-full bg-slate-100">
              {campaign.imageUrl ? (
                <Image
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-500">
                  Sin imagen
                </div>
              )}
            </div>

            <CardContent>
              <Badge variant="primary">
                {campaign.category?.name || "Sin categoría"}
              </Badge>

              <h1 className="mt-4 text-3xl font-bold text-slate-950">
                {campaign.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Creada por {campaign.user?.name || campaign.user?.email}
              </p>

              <p className="mt-6 leading-8 text-slate-700">
                {campaign.description}
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent>
              <h2 className="text-xl font-bold text-slate-950">Documentos</h2>

              {!campaign.documents || campaign.documents.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">
                  Esta campaña todavía no tiene documentos asociados.
                </p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {campaign.documents.map((document) => (
                    <div
                      key={document.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {document.title}
                          </h3>

                          {document.description && (
                            <p className="mt-1 text-sm text-slate-600">
                              {document.description}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-slate-500">
                            {formatDate(document.createdAt)}
                          </p>
                        </div>

                        {document.fileUrl && (
                          <a
                            href={document.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Ver archivo
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Progreso de la campaña
          </h2>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-slate-800">
                {formatCurrency(campaign.raised)}
              </span>
              <span className="text-slate-500">
                {formatCurrency(campaign.goal)}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {percentage.toFixed(1)}% recaudado
            </p>
          </div>

          <div className="mt-6">
            <DonationForm loading={donating} onSubmit={onDonate} />

            {donationError && (
              <p className="mt-3 text-sm text-red-600">{donationError}</p>
            )}

            {donationSuccess && (
              <p className="mt-3 text-sm text-green-600">{donationSuccess}</p>
            )}
          </div>

          <ButtonLink
            href="/documents"
            variant="outline"
            fullWidth
            className="mt-3"
          >
            Subir documento
          </ButtonLink>
        </aside>
      </div>
    </div>
  );
}
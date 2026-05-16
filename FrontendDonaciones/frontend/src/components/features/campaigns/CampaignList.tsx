import { Campaign } from "@/types/campaign";
import { CampaignCard } from "./CampaignCard";
import { Loading } from "@/components/ui/Loading";

type CampaignListProps = {
  campaigns: Campaign[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
};

export function CampaignList({
  campaigns,
  loading = false,
  error = "",
  emptyMessage = "No hay campañas disponibles.",
}: CampaignListProps) {
  if (loading) {
    return <Loading message="Cargando campañas..." />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
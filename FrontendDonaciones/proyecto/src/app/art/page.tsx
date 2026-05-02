import CampaignBoard from "@/features/campaigns/components/campaign-board/campaign-board";
import MainLayout from "@/shared/layouts/main-layout/main-layout";


export default function ArtPage() {
  return (
    <MainLayout>
      <CampaignBoard category="art" />
    </MainLayout>
  );
}
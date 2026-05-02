import CampaignBoard from '@/features/campaigns/components/campaign-board/campaign-board'
import MainLayout from '@/shared/layouts/main-layout/main-layout'
import React from 'react'

export default function PageEntrepreneurship() {
  return (
    <MainLayout>
      <CampaignBoard category="entrepreneurship" />
    </MainLayout>
  )
}

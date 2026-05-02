import CampaignBoard from '@/features/campaigns/components/campaign-board/campaign-board'
import MainLayout from '@/shared/layouts/main-layout/main-layout'
import React from 'react'

export default function PageTechnology() {
  return (
    <MainLayout>
      <CampaignBoard category="technology" />
    </MainLayout>
  )
}

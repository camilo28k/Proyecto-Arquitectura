import CampaignBoard from '@/features/campaigns/components/campaign-board/campaign-board'
import MainLayout from '@/shared/layouts/main-layout/main-layout'
import React from 'react'

export default function PageEnvironment() {
  return (
    <MainLayout>
      <CampaignBoard category="environment" />
    </MainLayout>
  )
}
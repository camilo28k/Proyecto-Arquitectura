import CampaignBoard from '@/features/campaigns/components/campaign-board/campaign-board'
import MainLayout from '@/shared/layouts/main-layout/main-layout'
import React from 'react'

export default function PageEducation() {
  return (
    <MainLayout>
      <CampaignBoard category="education" />
    </MainLayout>
  )
}

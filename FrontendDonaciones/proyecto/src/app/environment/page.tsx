import CampaignBoard from '@/app/features/campaigns/components/campaign-board'
import Layout from '@/app/layouts/layout'
import React from 'react'

export default function PageEnvironment() {
  return (
    <Layout>
      <CampaignBoard category="environment" />
    </Layout>
  )
}
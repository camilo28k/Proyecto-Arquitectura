import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { PrismaService } from '../services/prisma.service';
import { UploaderService } from '../services/uploader/s3.service';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService, UploaderService],
  exports: [CampaignService],
})
export class CampaignModule {}
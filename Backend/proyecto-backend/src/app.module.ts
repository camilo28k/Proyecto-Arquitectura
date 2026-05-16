import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CampaignModule } from './campaign/campaign.module';
import { CategoryModule } from './category/category.module';
import { DonationModule } from './donation/donation.module';
import { DocumentModule } from './document/document.module';
import { AuditLogModule } from './audit-log/audit-log.module';

@Module({
  imports: [AuthModule, UserModule, CampaignModule, CategoryModule, DonationModule, DocumentModule, AuditLogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

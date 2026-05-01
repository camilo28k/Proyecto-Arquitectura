import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, UploaderService],
})
export class HealthModule {}

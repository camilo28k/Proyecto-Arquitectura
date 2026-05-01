import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}

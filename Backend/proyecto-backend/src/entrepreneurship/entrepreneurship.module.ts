import { Module } from '@nestjs/common';
import { EntrepreneurshipService } from './entrepreneurship.service';
import { EntrepreneurshipController } from './entrepreneurship.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [EntrepreneurshipController],
  providers: [EntrepreneurshipService, UploaderService],
})
export class EntrepreneurshipModule {}

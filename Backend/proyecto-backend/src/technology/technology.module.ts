import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [TechnologyController],
  providers: [TechnologyService,UploaderService],
})
export class TechnologyModule {}

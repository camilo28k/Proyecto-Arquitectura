import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [ArtController],
  providers: [ArtService, UploaderService],
})
export class ArtModule {}

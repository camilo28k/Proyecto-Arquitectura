import { Module } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { UploaderService } from 'src/services/uploader/s3.service';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';


@Module({
  controllers: [DocumentController],
  providers: [DocumentService, PrismaService, UploaderService],
  exports: [DocumentService],
})
export class DocumentModule {}

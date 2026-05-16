import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() req,
    @UploadedFile() file: any,
    @Body() body: CreateDocumentDto,
  ) {
    return this.documentService.create(file, {
      ...body,
      uploadedById: req.user.id,
    });
  }

  @Post('generate-report/:campaignId')
  @UseGuards(AuthGuard('jwt'))
  generateCampaignReport(
    @Param('campaignId') campaignId: string,
    @Request() req,
  ) {
    return this.documentService.generateCampaignReport(
      campaignId,
      req.user.id,
      req.user.role,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.documentService.findAll();
  }

  @Get('my-documents')
  @UseGuards(AuthGuard('jwt'))
  findMyDocuments(@Request() req) {
    return this.documentService.findByUser(req.user.id);
  }

  @Get('campaign/:campaignId')
  @UseGuards(AuthGuard('jwt'))
  findByCampaign(@Param('campaignId') campaignId: string, @Request() req) {
    return this.documentService.findByCampaign(
      campaignId,
      req.user.id,
      req.user.role,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @Request() req) {
    return this.documentService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() body: UpdateDocumentDto,
  ) {
    return this.documentService.update(id, req.user.id, req.user.role, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req) {
    return this.documentService.remove(id, req.user.id, req.user.role);
  }
}
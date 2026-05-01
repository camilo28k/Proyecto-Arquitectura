import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('education')
export class EducationController {
  constructor(private readonly service: EducationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateEducationDto, @Req() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('id/:id')
  update(@Param('id') id: string, @Body() dto: UpdateEducationDto, @Req() req) {
    return this.service.update(id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.service.remove(id, req.user);
  }
}
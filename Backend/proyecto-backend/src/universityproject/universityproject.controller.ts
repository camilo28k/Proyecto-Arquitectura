import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UniversityprojectService } from './universityproject.service';
import { CreateUniversityprojectDto } from './dto/create-universityproject.dto';
import { UpdateUniversityprojectDto } from './dto/update-universityproject.dto';

@Controller('universityproject')
export class UniversityprojectController {
  constructor(private readonly universityprojectService: UniversityprojectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateUniversityprojectDto, @Req() req) {
    return this.universityprojectService.create(dto, req.user);
  }

  @Get()
  findAll() {
    return this.universityprojectService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.universityprojectService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('id/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUniversityprojectDto,
    @Req() req,
  ) {
    return this.universityprojectService.update(id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.universityprojectService.remove(id, req.user);
  }
}
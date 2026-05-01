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
import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto, @Req() req) {
    return this.technologyService.create(createTechnologyDto, req.user);
  }

  @Get()
  findAll() {
    return this.technologyService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.technologyService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('id/:id')
  update(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
    @Req() req,
  ) {
    return this.technologyService.update(id, updateTechnologyDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.technologyService.remove(id, req.user);
  }
}
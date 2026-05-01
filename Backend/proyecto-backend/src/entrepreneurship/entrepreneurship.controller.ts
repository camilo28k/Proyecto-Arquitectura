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
import { EntrepreneurshipService } from './entrepreneurship.service';
import { CreateEntrepreneurshipDto } from './dto/create-entrepreneurship.dto';
import { UpdateEntrepreneurshipDto } from './dto/update-entrepreneurship.dto';

@Controller('entrepreneurship')
export class EntrepreneurshipController {
  constructor(private readonly entrepreneurshipService: EntrepreneurshipService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createEntrepreneurshipDto: CreateEntrepreneurshipDto, @Req() req) {
    return this.entrepreneurshipService.create(createEntrepreneurshipDto, req.user);
  }

  @Get()
  findAll() {
    return this.entrepreneurshipService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.entrepreneurshipService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('id/:id')
  update(
    @Param('id') id: string,
    @Body() updateEntrepreneurshipDto: UpdateEntrepreneurshipDto,
    @Req() req,
  ) {
    return this.entrepreneurshipService.update(id, updateEntrepreneurshipDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.entrepreneurshipService.remove(id, req.user);
  }
}
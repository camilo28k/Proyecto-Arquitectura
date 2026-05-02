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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly service: ActivityService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateActivityDto, @Req() req) {
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
  update(@Param('id') id: string, @Body() dto: UpdateActivityDto, @Req() req) {
    return this.service.update(id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.service.remove(id, req.user);
  }
}
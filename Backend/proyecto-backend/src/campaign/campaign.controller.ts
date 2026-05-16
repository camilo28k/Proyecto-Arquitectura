import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() body: CreateCampaignDto) {
    return this.campaignService.create({
      ...body,
      userId: req.user.id,
    });
  }

  @Get()
  findAll(@Query('category') category?: string) {
    return this.campaignService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() body: UpdateCampaignDto,
  ) {
    return this.campaignService.update(id, req.user.id, req.user.role, body);
  }

  @Delete(':id')
@UseGuards(AuthGuard('jwt'))
remove(@Param('id') id: string, @Request() req) {
  return this.campaignService.remove(id, req.user.id, req.user.role);
}
}
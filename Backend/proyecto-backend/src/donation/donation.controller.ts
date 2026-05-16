import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() body: CreateDonationDto) {
    return this.donationService.create({
      ...body,
      userId: req.user.id,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.donationService.findAll();
  }

  @Get('my-donations')
  @UseGuards(AuthGuard('jwt'))
  findMyDonations(@Request() req) {
    return this.donationService.findByUser(req.user.id);
  }

  @Get('campaign/:campaignId')
  findByCampaign(@Param('campaignId') campaignId: string) {
    return this.donationService.findByCampaign(campaignId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @Request() req) {
    return this.donationService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateStatus(@Param('id') id: string, @Body() body: UpdateDonationDto) {
    return this.donationService.updateStatus(id, body.status);
  }
}
import { IsEnum } from 'class-validator';
import { DonationStatus } from '@prisma/client';

export class UpdateDonationDto {
  @IsEnum(DonationStatus)
  status: DonationStatus;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  goal: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrepreneurshipDto } from './create-entrepreneurship.dto';

export class UpdateEntrepreneurshipDto extends PartialType(CreateEntrepreneurshipDto) {}

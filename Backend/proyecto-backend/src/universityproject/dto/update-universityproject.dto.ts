import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversityprojectDto } from './create-universityproject.dto';

export class UpdateUniversityprojectDto extends PartialType(CreateUniversityprojectDto) {}

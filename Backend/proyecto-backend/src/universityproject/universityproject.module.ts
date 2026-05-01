import { Module } from '@nestjs/common';
import { UniversityprojectService } from './universityproject.service';
import { UniversityprojectController } from './universityproject.controller';

@Module({
  controllers: [UniversityprojectController],
  providers: [UniversityprojectService],
})
export class UniversityprojectModule {}

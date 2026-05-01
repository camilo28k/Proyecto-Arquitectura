import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { EducationModule } from './education/education.module';
import { TechnologyModule } from './technology/technology.module';
import { ArtModule } from './art/art.module';
import { EntrepreneurshipModule } from './entrepreneurship/entrepreneurship.module';
import { ActivityModule } from './activity/activity.module';
import { EnvironmentModule } from './environment/environment.module';
import { UniversityprojectModule } from './universityproject/universityproject.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HealthModule, EducationModule, TechnologyModule, ArtModule, EntrepreneurshipModule, ActivityModule, EnvironmentModule, UniversityprojectModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

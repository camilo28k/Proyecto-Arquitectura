import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(dto: CreateActivityDto, user: any) {
    return this.activity.create({
      data: {
        objetivo: dto.objetivo,
        userId: user.id,
      },
    });
  }

  findAll() {
    return this.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const activity = await this.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException('Actividad no encontrada');
    }

    return activity;
  }

  async update(id: string, dto: UpdateActivityDto, user: any) {
    const activity = await this.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException('Actividad no encontrada');
    }

    if (user.role !== 'ADMIN' && activity.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }

    return this.activity.update({
      where: { id },
      data: {
        objetivo: dto.objetivo ?? activity.objetivo,
      },
    });
  }

  async remove(id: string, user: any) {
    const activity = await this.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException('Actividad no encontrada');
    }

    if (user.role !== 'ADMIN' && activity.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }

    return this.activity.delete({
      where: { id },
    });
  }
}
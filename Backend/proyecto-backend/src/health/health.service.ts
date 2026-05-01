import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@Injectable()
export class HealthService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(dto: CreateHealthDto, user: any) {
    return this.health.create({
      data: {
        title: dto.title,
        description: dto.description,
        goal: Number(dto.goal),
        raised: Number(dto.raised) || 0,
        userId: user.id,
      },
    });
  }

  findAll() {
    return this.health.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const campaign = await this.health.findUnique({ where: { id } });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    return campaign;
  }

  async update(id: string, dto: UpdateHealthDto, user: any) {
    const campaign = await this.health.findUnique({ where: { id } });
  
    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }
  
    const onlyDonation =
      dto.raised !== undefined &&
      dto.title === undefined &&
      dto.description === undefined &&
      dto.goal === undefined;
  
    // Si solo está aportando, cualquier usuario logueado puede hacerlo
    if (onlyDonation) {
      return this.health.update({
        where: { id },
        data: {
          raised: Number(dto.raised),
        },
      });
    }
  
    // Para editar datos, solo admin o dueño
    if (user.role !== 'ADMIN' && campaign.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }
  
    return this.education.update({
      where: { id },
      data: {
        ...dto,
        goal: dto.goal ? Number(dto.goal) : campaign.goal,
        raised: dto.raised ? Number(dto.raised) : campaign.raised,
      },
    });
  }

  async remove(id: string, user: any) {
    const campaign = await this.health.findUnique({ where: { id } });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    if (user.role !== 'ADMIN' && campaign.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }

    return this.health.delete({ where: { id } });
  }
}

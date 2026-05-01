import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEntrepreneurshipDto } from './dto/create-entrepreneurship.dto';
import { UpdateEntrepreneurshipDto } from './dto/update-entrepreneurship.dto';

@Injectable()
export class EntrepreneurshipService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(dto: CreateEntrepreneurshipDto, user: any) {
    return this.entrepreneurship.create({
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
    return this.entrepreneurship.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const campaign = await this.entrepreneurship.findUnique({ where: { id } });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    return campaign;
  }

  async update(id: string, updateEntrepreneurshipDto: UpdateEntrepreneurshipDto, user: any) {
    const campaign = await this.entrepreneurship.findUnique({ where: { id } });
  
    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }
  
    const onlyDonation =
      updateEntrepreneurshipDto.raised !== undefined &&
      updateEntrepreneurshipDto.title === undefined &&
      updateEntrepreneurshipDto.description === undefined &&
      updateEntrepreneurshipDto.goal === undefined;
  
    // Si solo está aportando, cualquier usuario logueado puede hacerlo
    if (onlyDonation) {
      return this.entrepreneurship.update({
        where: { id },
        data: {
          raised: Number(updateEntrepreneurshipDto.raised),
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
        ...updateEntrepreneurshipDto,
        goal: updateEntrepreneurshipDto.goal ? Number(updateEntrepreneurshipDto.goal) : campaign.goal,
        raised: updateEntrepreneurshipDto.raised ? Number(updateEntrepreneurshipDto.raised) : campaign.raised,
      },
    });
  }

  async remove(id: string, user: any) {
    const campaign = await this.entrepreneurship.findUnique({ where: { id } });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    if (user.role !== 'ADMIN' && campaign.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }

    return this.entrepreneurship.delete({ where: { id } });
  }
}
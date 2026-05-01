import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUniversityprojectDto } from './dto/create-universityproject.dto';
import { UpdateUniversityprojectDto } from './dto/update-universityproject.dto';

@Injectable()
export class UniversityprojectService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(dto: CreateUniversityprojectDto, user: any) {
    return this.universityProject.create({
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
    return this.universityProject.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const campaign = await this.universityProject.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    return campaign;
  }

  async update(id: string, dto: UpdateUniversityprojectDto, user: any) {
    const campaign = await this.universityProject.findUnique({ where: { id } });
  
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
      return this.universityProject.update({
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
    const campaign = await this.universityProject.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    if (user.role !== 'ADMIN' && campaign.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }

    return this.universityProject.delete({
      where: { id },
    });
  }
}
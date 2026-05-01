import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class EnvironmentService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
   // 🔹 CREAR
  create(dto: CreateEnvironmentDto, user: any) {
    return this.environment.create({
      data: {
        title: dto.title,
        description: dto.description,
        goal: Number(dto.goal),
        raised: Number(dto.raised) || 0,
        userId: user.id, // 👈 CLAVE
      },
    });
  }

  // 🔹 LISTAR
  findAll() {
    return this.environment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 🔹 UNO
  async findOne(id: string) {
    const campaign = await this.environment.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    return campaign;
  }

  async update(id: string, dto: UpdateEnvironmentDto, user: any) {
    const campaign = await this.environment.findUnique({ where: { id } });
  
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
      return this.environment.update({
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

  // 🔹 ELIMINAR
  async remove(id: string, user: any) {
    const campaign = await this.environment.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    if (user.role !== 'ADMIN' && campaign.userId !== user.id) {
      throw new ForbiddenException('No tienes permiso');
    }

    return this.environment.delete({
      where: { id },
    });
  }
}
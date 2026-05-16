import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAuditLogDto) {
    const auditLog = await this.prisma.auditLog.create({
      data: {
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        description: data.description,
        userId: data.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return auditLog;
  }

  async findAll(filters?: {
    action?: AuditAction;
    entity?: string;
    userId?: string;
  }) {
    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        action: filters?.action,
        entity: filters?.entity,
        userId: filters?.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Logs de auditoría obtenidos correctamente',
      auditLogs,
    };
  }

  async findOne(id: string) {
    const auditLog = await this.prisma.auditLog.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!auditLog) {
      throw new NotFoundException('El log de auditoría no existe');
    }

    return {
      message: 'Log de auditoría obtenido correctamente',
      auditLog,
    };
  }

  async findByUser(userId: string) {
    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Logs del usuario obtenidos correctamente',
      auditLogs,
    };
  }

  async findByEntity(entity: string, entityId: string) {
    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        entity,
        entityId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Logs de la entidad obtenidos correctamente',
      auditLogs,
    };
  }
}
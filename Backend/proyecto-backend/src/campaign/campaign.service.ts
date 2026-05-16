import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UploaderService } from '../services/uploader/s3.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploaderService: UploaderService,
  ) {}

  async create(data: CreateCampaignDto & { userId: string }) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }

    const campaign = await this.prisma.campaign.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        goal: Number(data.goal),
        imageUrl: data.imageUrl,
        userId: data.userId,
        categoryId: data.categoryId,
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
        category: true,
        donations: true,
        documents: true,
      },
    });

    return {
      message: 'Campaña creada correctamente',
      campaign,
    };
  }

  async findAll(category?: string) {
    const campaigns = await this.prisma.campaign.findMany({
      where: category
        ? {
            category: {
              name: {
                equals: category,
                mode: 'insensitive',
              },
            },
          }
        : {},
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        category: true,
        donations: true,
        documents: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Campañas obtenidas correctamente',
      campaigns,
    };
  }

  async findOne(id: string) {
  const campaign = await this.prisma.campaign.findUnique({
    where: {
      id,
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
      category: true,
      donations: {
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
      },
      documents: {
        where: {
          type: 'UPLOADED',
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!campaign) {
    throw new NotFoundException('La campaña no existe');
  }

  return {
    message: 'Campaña obtenida correctamente',
    campaign,
  };
}

  async update(
    id: string,
    userId: string,
    role: string,
    data: UpdateCampaignDto,
  ) {
    const campaign = await this.prisma.campaign.findUnique({
      where: {
        id,
      },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const isOwner = campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('No tienes permiso para editar esta campaña');
    }

    if (data.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('La categoría no existe');
      }
    }

    const updatedCampaign = await this.prisma.campaign.update({
      where: {
        id,
      },
      data: {
        title: data.title?.trim(),
        description: data.description?.trim(),
        goal: data.goal !== undefined ? Number(data.goal) : undefined,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
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
        category: true,
        donations: true,
        documents: true,
      },
    });

    return {
      message: 'Campaña actualizada correctamente',
      campaign: updatedCampaign,
    };
  }

  async remove(id: string, userId: string, role: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        documents: true,
        donations: true,
      },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const isOwner = campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar esta campaña',
      );
    }

    for (const document of campaign.documents) {
      if (document.s3Key) {
        try {
          await this.uploaderService.delete(document.s3Key);
        } catch (error) {
          console.error(
            `Error eliminando archivo de S3 con key ${document.s3Key}:`,
            error,
          );
        }
      }
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.donation.deleteMany({
        where: {
          campaignId: id,
        },
      });

      await tx.campaignDocument.deleteMany({
        where: {
          campaignId: id,
        },
      });

      await tx.campaign.delete({
        where: {
          id,
        },
      });
    });

    return {
      message: 'Campaña eliminada correctamente',
    };
  }
}
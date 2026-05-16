import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DonationStatus } from '@prisma/client';
import { CreateDonationDto } from './dto/create-donation.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class DonationService {
  constructor(private readonly prisma: PrismaService ) {}

  async create(data: CreateDonationDto & { userId: string }) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: data.campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const donation = await this.prisma.$transaction(async (tx) => {
      const createdDonation = await tx.donation.create({
        data: {
          amount: Number(data.amount),
          status: DonationStatus.COMPLETED,
          userId: data.userId,
          campaignId: data.campaignId,
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
          campaign: {
            include: {
              category: true,
            },
          },
        },
      });

      await tx.campaign.update({
        where: { id: data.campaignId },
        data: {
          raised: {
            increment: Number(data.amount),
          },
        },
      });

      return createdDonation;
    });

    return {
      message: 'Donación registrada correctamente',
      donation,
    };
  }

  async findAll() {
    const donations = await this.prisma.donation.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        campaign: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Donaciones obtenidas correctamente',
      donations,
    };
  }

  async findByCampaign(campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const donations = await this.prisma.donation.findMany({
      where: {
        campaignId,
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
      message: 'Donaciones de la campaña obtenidas correctamente',
      donations,
    };
  }

  async findByUser(userId: string) {
    const donations = await this.prisma.donation.findMany({
      where: {
        userId,
      },
      include: {
        campaign: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Tus donaciones fueron obtenidas correctamente',
      donations,
    };
  }

  async findOne(id: string, userId: string, role: string) {
    const donation = await this.prisma.donation.findUnique({
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
        campaign: {
          include: {
            category: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!donation) {
      throw new NotFoundException('La donación no existe');
    }

    const isDonor = donation.userId === userId;
    const isCampaignOwner = donation.campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isDonor && !isCampaignOwner && !isAdmin) {
      throw new ForbiddenException('No tienes permiso para ver esta donación');
    }

    return {
      message: 'Donación obtenida correctamente',
      donation,
    };
  }

  async updateStatus(id: string, status: DonationStatus) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      throw new NotFoundException('La donación no existe');
    }

    const updatedDonation = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.donation.update({
        where: { id },
        data: {
          status,
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
          campaign: {
            include: {
              category: true,
            },
          },
        },
      });

      if (
        donation.status === DonationStatus.COMPLETED &&
        status !== DonationStatus.COMPLETED
      ) {
        await tx.campaign.update({
          where: { id: donation.campaignId },
          data: {
            raised: {
              decrement: donation.amount,
            },
          },
        });
      }

      if (
        donation.status !== DonationStatus.COMPLETED &&
        status === DonationStatus.COMPLETED
      ) {
        await tx.campaign.update({
          where: { id: donation.campaignId },
          data: {
            raised: {
              increment: donation.amount,
            },
          },
        });
      }

      return updated;
    });

    return {
      message: 'Estado de la donación actualizado correctamente',
      donation: updatedDonation,
    };
  }
}
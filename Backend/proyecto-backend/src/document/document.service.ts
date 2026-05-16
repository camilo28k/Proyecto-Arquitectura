import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import PDFDocument = require('pdfkit');
import { DocumentType } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { UploaderService } from '../services/uploader/s3.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
@Injectable()
export class DocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploaderService: UploaderService,
  ) {}

  async create(
    file: any,
    data: CreateDocumentDto & { uploadedById: string },
  ) {
    if (!file) {
      throw new BadRequestException('Debes subir un archivo');
    }

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: data.campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: data.uploadedById },
    });

    const isOwner = campaign.userId === data.uploadedById;
    const isAdmin = user?.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para subir documentos a esta campaña',
      );
    }

    const cleanFileName = this.cleanFileName(file.originalname);

    const s3Key = `campaigns/${data.campaignId}/documents/${Date.now()}-${cleanFileName}`;

    await this.uploaderService.upload(file, s3Key);

    const fileUrl = await this.uploaderService.getSignedUrl(s3Key);

    const document = await this.prisma.campaignDocument.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim(),
        type: data.type || DocumentType.UPLOADED,

        fileUrl,
        s3Key,
        bucket: this.uploaderService.getBucketName(),

        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,

        campaignId: data.campaignId,
        uploadedById: data.uploadedById,
      },
      include: {
        campaign: {
          include: {
            category: true,
          },
        },
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return {
      message: 'Documento subido correctamente',
      document,
    };
  }

  async generateCampaignReport(campaignId: string, userId: string, role: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
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
        documents: true,
      },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const pdfBuffer = await this.createCampaignReportPdf(campaign);

    const safeTitle = this.cleanTextForFileName(campaign.title);

    const fileName = `reporte-${safeTitle || 'campana'}-${Date.now()}.pdf`;

    const s3Key = `campaigns/${campaign.id}/reports/${fileName}`;

    const fileForUpload = {
      buffer: pdfBuffer,
      mimetype: 'application/pdf',
      originalname: fileName,
      size: pdfBuffer.length,
    };

    await this.uploaderService.upload(fileForUpload, s3Key);

    const fileUrl = await this.uploaderService.getSignedUrl(s3Key);

    const document = await this.prisma.campaignDocument.create({
  data: {
    title: `Reporte de campaña - ${campaign.title}`,
    description:
      'Reporte generado automáticamente con información de la campaña, donaciones y documentos asociados.',
    type: DocumentType.GENERATED,

    fileUrl,
    s3Key,
    bucket: this.uploaderService.getBucketName(),

    fileName,
    mimeType: 'application/pdf',
    size: pdfBuffer.length,

    campaignId: campaign.id,
    uploadedById: userId,
  },
  include: {
    campaign: {
      include: {
        category: true,
      },
    },
    uploadedBy: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
  },
});

    return {
      message: 'Reporte generado correctamente',
      document,
    };
  }

  async findAll() {
    const documents = await this.prisma.campaignDocument.findMany({
      include: {
        campaign: {
          include: {
            category: true,
          },
        },
        uploadedBy: {
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

    const documentsWithSignedUrls = await Promise.all(
      documents.map(async (document) => ({
        ...document,
        fileUrl: await this.uploaderService.getSignedUrl(document.s3Key),
      })),
    );

    return {
      message: 'Documentos obtenidos correctamente',
      documents: documentsWithSignedUrls,
    };
  }

  async findByCampaign(campaignId: string, userId: string, role: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException('La campaña no existe');
    }

    const isOwner = campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para ver los documentos de esta campaña',
      );
    }

    const documents = await this.prisma.campaignDocument.findMany({
      where: {
        campaignId,
      },
      include: {
        uploadedBy: {
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

    const documentsWithSignedUrls = await Promise.all(
      documents.map(async (document) => ({
        ...document,
        fileUrl: await this.uploaderService.getSignedUrl(document.s3Key),
      })),
    );

    return {
      message: 'Documentos de la campaña obtenidos correctamente',
      documents: documentsWithSignedUrls,
    };
  }

  async findByUser(userId: string) {
    const documents = await this.prisma.campaignDocument.findMany({
      where: {
        uploadedById: userId,
      },
      include: {
        campaign: {
          include: {
            category: true,
          },
        },
        uploadedBy: {
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

    const documentsWithSignedUrls = await Promise.all(
      documents.map(async (document) => ({
        ...document,
        fileUrl: await this.uploaderService.getSignedUrl(document.s3Key),
      })),
    );

    return {
      message: 'Tus documentos fueron obtenidos correctamente',
      documents: documentsWithSignedUrls,
    };
  }

  async findOne(id: string, userId: string, role: string) {
    const document = await this.prisma.campaignDocument.findUnique({
      where: { id },
      include: {
        campaign: true,
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException('El documento no existe');
    }

    const isUploader = document.uploadedById === userId;
    const isCampaignOwner = document.campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isUploader && !isCampaignOwner && !isAdmin) {
      throw new ForbiddenException('No tienes permiso para ver este documento');
    }

    const signedUrl = await this.uploaderService.getSignedUrl(document.s3Key);

    return {
      message: 'Documento obtenido correctamente',
      document: {
        ...document,
        fileUrl: signedUrl,
      },
    };
  }

  async update(
    id: string,
    userId: string,
    role: string,
    data: UpdateDocumentDto,
  ) {
    const document = await this.prisma.campaignDocument.findUnique({
      where: { id },
      include: {
        campaign: true,
      },
    });

    if (!document) {
      throw new NotFoundException('El documento no existe');
    }

    const isUploader = document.uploadedById === userId;
    const isCampaignOwner = document.campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isUploader && !isCampaignOwner && !isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para editar este documento',
      );
    }

    const updatedDocument = await this.prisma.campaignDocument.update({
      where: { id },
      data: {
        title: data.title?.trim(),
        description: data.description?.trim(),
        type: data.type,
      },
      include: {
        campaign: {
          include: {
            category: true,
          },
        },
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return {
      message: 'Documento actualizado correctamente',
      document: {
        ...updatedDocument,
        fileUrl: await this.uploaderService.getSignedUrl(updatedDocument.s3Key),
      },
    };
  }

  async remove(id: string, userId: string, role: string) {
    const document = await this.prisma.campaignDocument.findUnique({
      where: { id },
      include: {
        campaign: true,
      },
    });

    if (!document) {
      throw new NotFoundException('El documento no existe');
    }

    const isUploader = document.uploadedById === userId;
    const isCampaignOwner = document.campaign.userId === userId;
    const isAdmin = role === 'ADMIN';

    if (!isUploader && !isCampaignOwner && !isAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este documento',
      );
    }

    await this.uploaderService.delete(document.s3Key);

    await this.prisma.campaignDocument.delete({
      where: { id },
    });

    return {
      message: 'Documento eliminado correctamente',
    };
  }

  private async createCampaignReportPdf(campaign: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
      });

      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const totalDonations = campaign.donations.length;
      const totalRaised = campaign.raised;
      const pendingAmount = Math.max(campaign.goal - campaign.raised, 0);
      const progress =
        campaign.goal > 0
          ? Math.min((campaign.raised / campaign.goal) * 100, 100)
          : 0;

      doc.fontSize(20).text('Reporte de campaña', { align: 'center' });
      doc.moveDown();

      doc.fontSize(14).text('Información general', { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(11);
      doc.text(`Título: ${campaign.title}`);
      doc.text(`Descripción: ${campaign.description}`);
      doc.text(`Categoría: ${campaign.category?.name || 'Sin categoría'}`);
      doc.text(`Creador: ${campaign.user?.name || campaign.user?.email}`);
      doc.text(`Correo creador: ${campaign.user?.email}`);
      doc.text(`Meta: $${campaign.goal.toLocaleString('es-CO')}`);
      doc.text(`Recaudado: $${totalRaised.toLocaleString('es-CO')}`);
      doc.text(`Faltante: $${pendingAmount.toLocaleString('es-CO')}`);
      doc.text(`Progreso: ${progress.toFixed(1)}%`);
      doc.text(
        `Fecha de creación: ${new Date(
          campaign.createdAt,
        ).toLocaleDateString('es-CO')}`,
      );

      doc.moveDown();

      doc.fontSize(14).text('Resumen de donaciones', { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(11);
      doc.text(`Cantidad de donaciones: ${totalDonations}`);
      doc.text(`Total recaudado: $${totalRaised.toLocaleString('es-CO')}`);

      doc.moveDown();

      doc.fontSize(14).text('Detalle de donaciones', { underline: true });
      doc.moveDown(0.5);

      if (campaign.donations.length === 0) {
        doc
          .fontSize(11)
          .text('Esta campaña todavía no tiene donaciones registradas.');
      } else {
        campaign.donations.forEach((donation: any, index: number) => {
          const donorName =
            donation.user?.name || donation.user?.email || 'Usuario';
          const donorEmail = donation.user?.email || 'Sin correo';
          const amount = donation.amount.toLocaleString('es-CO');
          const date = new Date(donation.createdAt).toLocaleDateString('es-CO');

          doc
            .fontSize(10)
            .text(
              `${index + 1}. ${donorName} | ${donorEmail} | $${amount} | ${
                donation.status
              } | ${date}`,
            );
        });
      }

      doc.moveDown();

      doc.fontSize(14).text('Documentos asociados', { underline: true });
      doc.moveDown(0.5);

      if (campaign.documents.length === 0) {
        doc.fontSize(11).text('Esta campaña no tiene documentos asociados.');
      } else {
        campaign.documents.forEach((document: any, index: number) => {
          doc
            .fontSize(10)
            .text(
              `${index + 1}. ${document.title} | ${document.type} | ${
                document.fileName || 'Sin nombre de archivo'
              }`,
            );
        });
      }

      doc.moveDown();

      doc
        .fontSize(9)
        .fillColor('gray')
        .text(`Reporte generado el ${new Date().toLocaleString('es-CO')}`, {
          align: 'center',
        });

      doc.end();
    });
  }

  private cleanFileName(fileName: string): string {
    return fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.-]/g, '');
  }

  private cleanTextForFileName(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
}
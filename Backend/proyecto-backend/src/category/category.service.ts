import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const name = data.name.trim();

    const existingCategory = await this.prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      throw new ConflictException('La categoría ya existe');
    }

    const category = await this.prisma.category.create({
      data: {
        name,
        description: data.description?.trim(),
      },
    });

    return {
      message: 'Categoría creada correctamente',
      category,
    };
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        campaigns: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Categorías obtenidas correctamente',
      categories,
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        campaigns: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
            donations: true,
            documents: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }

    return {
      message: 'Categoría obtenida correctamente',
      category,
    };
  }

  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }

    if (data.name) {
      const name = data.name.trim();

      const existingCategory = await this.prisma.category.findUnique({
        where: { name },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('Ya existe una categoría con ese nombre');
      }
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        name: data.name?.trim(),
        description: data.description?.trim(),
      },
    });

    return {
      message: 'Categoría actualizada correctamente',
      category: updatedCategory,
    };
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        campaigns: true,
      },
    });

    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }

    if (category.campaigns.length > 0) {
      throw new ConflictException(
        'No puedes eliminar una categoría que tiene campañas asociadas',
      );
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return {
      message: 'Categoría eliminada correctamente',
    };
  }
}
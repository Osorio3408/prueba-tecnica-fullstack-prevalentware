import { PrismaClient } from '@prisma/client';
import { CreateMovementDTO } from './movement.types';

const prisma = new PrismaClient();

export class MovementRepository {
  async create(data: CreateMovementDTO) {
    return prisma.movement.create({
      data,
    });
  }

  async findAll() {
    return prisma.movement.findMany({
      include: { user: true },
      orderBy: { date: 'desc' },
    });
  }
}

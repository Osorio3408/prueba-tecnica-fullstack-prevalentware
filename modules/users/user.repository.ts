import { PrismaClient } from "@prisma/client";
import { UpdateUserDTO } from "./user.types";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    return prisma.user.update({
      where: { id },
      data
    });
  }
}
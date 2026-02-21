import { Role } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { UpdateUserDTO } from "./user.types";

export class UserService {
  private repository = new UserRepository();

  async getAllUsers() {
    return this.repository.findAll();
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    // Validación básica de negocio
    if (data.role && !Object.values(Role).includes(data.role)) {
      throw new Error("Invalid role value");
    }

    return this.repository.updateUser(id, data);
  }
}
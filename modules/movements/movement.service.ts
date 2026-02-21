import { MovementRepository } from "./movement.repository";
import { CreateMovementDTO } from "./movement.types";

export class MovementService {
  private repository = new MovementRepository();

  async createMovement(data: CreateMovementDTO) {
    if (data.amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    return this.repository.create(data);
  }

  async getAllMovements() {
    return this.repository.findAll();
  }
}
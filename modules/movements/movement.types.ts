import { MovementType } from '@prisma/client';

export interface CreateMovementDTO {
  concept: string;
  amount: number;
  date: Date;
  type: MovementType;
  userId: string;
}

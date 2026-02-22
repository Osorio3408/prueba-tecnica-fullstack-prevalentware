import { Role } from '@prisma/client';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  createdAt: Date;
}

export interface UpdateUserDTO {
  role?: Role;
  phone?: string;
  name?: string;
}

export {};
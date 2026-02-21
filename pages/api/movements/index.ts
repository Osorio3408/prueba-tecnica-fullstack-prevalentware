import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/modules/movements/movement.service";
import { requireRole } from "@/lib/rbac";
import { Role } from "@prisma/client";

const service = new MovementService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await requireRole(req, res, Role.ADMIN);
    console.log(session)
    if (!session) return;

    const movements = await service.getAllMovements();
    return res.status(200).json(movements);
  }

  if (req.method === "POST") {
    const session = await requireRole(req, res, Role.ADMIN);
    if (!session) return;

    const movement = await service.createMovement({
      ...req.body,
      userId: session.user.id,
    });

    return res.status(201).json(movement);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
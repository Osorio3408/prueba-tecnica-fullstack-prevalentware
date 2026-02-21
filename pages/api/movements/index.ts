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

  const { concept, amount, date, type } = req.body;

  if (!concept || typeof concept !== "string") {
    return res.status(400).json({ message: "Concept is required" });
  }

  if (!amount || isNaN(Number(amount))) {
    return res.status(400).json({ message: "Amount must be a valid number" });
  }

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (!type || !["INCOME", "EXPENSE"].includes(type)) {
    return res.status(400).json({ message: "Invalid movement type" });
  }

  try {
    const movement = await service.createMovement({
      concept,
      amount,
      date,
      type,
      userId: session.user.id,
    });

    return res.status(201).json(movement);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to create movement",
    });
  }
}

  return res.status(405).json({ message: "Method not allowed" });
}
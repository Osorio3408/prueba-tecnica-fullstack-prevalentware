import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/modules/movements/movement.service";
import { requireRole } from "@/lib/rbac";
import { Role } from "@prisma/client";

const service = new MovementService();

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Financial movements management
 */

/**
 * @swagger
 * /api/movements:
 *   get:
 *     summary: Get all financial movements
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: List of movements
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new movement
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             concept: Salary
 *             amount: 1000
 *             date: 2026-02-21T00:00:00.000Z
 *             type: INCOME
 *     responses:
 *       201:
 *         description: Movement created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
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
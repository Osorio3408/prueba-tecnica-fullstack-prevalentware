import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "@/lib/rbac";
import { Role } from "@prisma/client";
import { MovementService } from "@/modules/movements/movement.service";

const service = new MovementService();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Financial reports
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get financial summary
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Financial summary
 *         content:
 *           application/json:
 *             example:
 *               income: 1000
 *               expense: 200
 *               balance: 800
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await requireRole(req, res, Role.ADMIN);
  if (!session) return;

  if (req.method === "GET") {
    const summary = await service.getSummary();
    return res.status(200).json(summary);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
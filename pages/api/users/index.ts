import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "@/lib/rbac";
import { Role } from "@prisma/client";
import { UserService } from "@/modules/users/user.service";

const service = new UserService();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (Admin only)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await requireRole(req, res, Role.ADMIN);
  if (!session) return;

  if (req.method === "GET") {
    const users = await service.getAllUsers();
    return res.status(200).json(users);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
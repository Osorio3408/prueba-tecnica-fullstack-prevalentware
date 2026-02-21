import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "@/lib/rbac";
import { Role } from "@prisma/client";
import { UserService } from "@/modules/users/user.service";

const service = new UserService();

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user role or phone
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             role: USER
 *             phone: "123456789"
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await requireRole(req, res, Role.ADMIN);
  if (!session) return;

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const { role, phone, name } = req.body;

  if (!role && !phone && !name) {
    return res.status(400).json({
      message: "At least one field (role, phone, name) must be provided",
    });
  }

  if (role && !Object.values(Role).includes(role)) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  if (phone && typeof phone !== "string") {
    return res.status(400).json({ message: "Phone must be a string" });
  }

  if (name && typeof name !== "string") {
    return res.status(400).json({ message: "Name must be a string" });
  }

  try {
    const updatedUser = await service.updateUser(id, {
      role,
      phone,
      name,
    });

    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to update user",
    });
  }
}
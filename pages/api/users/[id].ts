import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "@/lib/rbac";
import { Role } from "@prisma/client";
import { UserService } from "@/modules/users/user.service";

const service = new UserService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await requireRole(req, res, Role.ADMIN);
  if (!session) return;

  const { id } = req.query;

  if (req.method === "PUT") {
    const { role, phone, name } = req.body;

    const updatedUser = await service.updateUser(id as string, {
      role,
      phone,
      name
    });

    return res.status(200).json(updatedUser);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
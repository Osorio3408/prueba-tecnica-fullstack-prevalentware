import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { Role } from "@prisma/client";

export async function getSession(req: NextApiRequest) {
  return await auth.api.getSession({
    headers: new Headers(req.headers as any)
  });
}

export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  return session;
}

export async function requireRole(
  req: NextApiRequest,
  res: NextApiResponse,
  role: Role
) {
  const session = await requireAuth(req, res);
  if (!session) return null;

  if ((session.user as any).role !== role) {
    res.status(403).json({ message: "Forbidden" });
    return null;
  }

  return session;
}
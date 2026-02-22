import { auth } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export async function getSession(req: NextApiRequest) {
  return await auth.api.getSession({
    headers: new Headers(req.headers as any),
  });
}

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return null;
  }

  return session;
}

const prisma = new PrismaClient();

export async function requireRole(
  req: NextApiRequest,
  res: NextApiResponse,
  role: Role
) {
  const session = await requireAuth(req, res);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || user.role !== role) {
    res.status(403).json({ message: 'Forbidden' });
    return null;
  }

  return session;
}

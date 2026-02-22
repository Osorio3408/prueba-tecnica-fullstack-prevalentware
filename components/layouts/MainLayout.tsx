'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Role } from '@prisma/client';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  const linkClass = (path: string) =>
    `relative pb-1 transition ${
      isActive(path)
        ? 'text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600'
        : 'hover:text-blue-600'
    }`;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200'>
        <div className='animate-spin rounded-full h-10 w-10 border-4 border-slate-300 border-t-slate-900'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 to-slate-200'>
      <header className='bg-white/80 backdrop-blur-md border-b shadow-sm px-8 py-4 flex justify-between items-center'>
        <h1 className='font-bold text-xl tracking-tight'>
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <nav className='flex gap-6 items-center text-sm font-medium'>
          {session?.data?.user && (
            <Link href='/movements' className={linkClass('/movements')}>
              Movimientos
            </Link>
          )}

          {session?.data?.user?.role === 'ADMIN' && (
            <>
              <Link href='/users' className={linkClass('/users')}>
                Usuarios
              </Link>
              <Link href='/reports' className={linkClass('/reports')}>
                Reportes
              </Link>
            </>
          )}
          {session?.data?.user && (
            <Button
              className='text-red-700'
              variant='outline'
              size='sm'
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          )}
        </nav>
      </header>

      <main className='max-w-6xl mx-auto py-10 px-6'>{children}</main>
    </div>
  );
}

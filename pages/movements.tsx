'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import MovementTable from '@/components/movements/MovementTable';
import MovementForm from '@/components/movements/MovementForm';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import { Role } from '@prisma/client';
import Router from 'next/router';

export default function MovementsPage() {
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const fetchMovements = async () => {
    setLoading(true);
    const res = await fetch('/api/movements');
    if (res.status === 401) {
      Router.push('/');
      return;
    }

    const data = await res.json();
    setMovements(data);
    setLoading(false);
  };

  useEffect(() => {
    authClient.getSession().then(setSession);
    console.log(session);
    fetchMovements();
  }, []);

  return (
    <MainLayout>
      <div className='bg-white p-8 rounded-xl shadow-md'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Movimientos financieros
          </h2>

          {session?.data?.user?.role === 'ADMIN' && (
            <Button onClick={() => setOpen(true)}>+ Nuevo Movimiento</Button>
          )}
        </div>

        {loading ? (
          <p className='text-gray-500'>Cargando movimientos...</p>
        ) : (
          <MovementTable movements={movements} />
        )}

        <MovementForm
          open={open}
          setOpen={setOpen}
          onSuccess={fetchMovements}
        />

      </div>
    </MainLayout>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authClient } from '@/lib/auth/client';
import MainLayout from '@/components/layouts/MainLayout';
import LoginButton from '@/components/auth/LoginButton';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((res: any) => {
      if (res?.data?.user) {
        router.push('/movements');
      } else {
        setLoading(false);
      }
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
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6'>
      <div className='bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center'>
        <div className='flex justify-center mb-6'>
          <div className='bg-white/20 p-4 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-8 h-8 text-white'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.9 10.96.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.21.7-3.89-1.55-3.89-1.55-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18A11.1 11.1 0 0112 6.8c.98.01 1.97.13 2.9.38 2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.43-2.7 5.4-5.27 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.21.67.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z' />
            </svg>
          </div>
        </div>

        <h1 className='text-3xl font-bold text-white mb-4'>
          Sistema de Gestión Financiera
        </h1>

        <p className='text-slate-300 mb-8 leading-relaxed'>
          Administra tus ingresos y gastos de forma inteligente. Visualiza
          reportes claros y toma decisiones financieras basadas en datos reales.
        </p>

        <LoginButton />

        <p className='text-xs text-slate-400 mt-6'>
          Acceso seguro con autenticación GitHub.
        </p>
      </div>
    </div>
  );
}

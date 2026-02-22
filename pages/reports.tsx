'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layouts/MainLayout';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FinancialChart from '@/components/dashboard/FinancialChart';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';

export default function ReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    authClient.getSession().then((res: any) => {
      if (!res?.data?.user) {
        router.push('/');
        return;
      }

      if (res.data.user.role !== 'ADMIN') {
        router.push('/movements');
        return;
      }

      fetchSummary();
    });
  }, []);

  const fetchSummary = async () => {
    const res = await fetch('/api/reports');
    const data = await res.json();
    setSummary(data);
    setLoading(false);
  };

  const handleDownload = async () => {
    window.open('/api/reports/csv', '_blank');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-4 border-slate-300 border-t-slate-900'></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className='flex flex-col gap-8 w-[800px]'>
        <h2 className='text-3xl font-bold'>Reportes Financieros</h2>

        <SummaryCards summary={summary} />

        <FinancialChart summary={summary} />

        <div className='flex justify-end'>
          <Button onClick={handleDownload}>Descargar Reporte CSV</Button>
        </div>
      </div>
    </MainLayout>
  );
}

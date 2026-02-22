'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function SummaryCards({ summary }: any) {
  if (!summary) return null;

  const { income, expense, balance } = summary;

  return (
    <div className='grid md:grid-cols-3 gap-6'>
      <Card className='shadow-md border-green-200 '>
        <CardContent className='p-6'>
          <p className='text-sm text-green-700 font-medium'>Ingresos</p>
          <h3 className='text-2xl font-bold text-green-800 mt-2'>${income}</h3>
        </CardContent>
      </Card>

      <Card className='shadow-md border-red-200'>
        <CardContent className='p-6'>
          <p className='text-sm text-red-700 font-medium'>Gastos</p>
          <h3 className='text-2xl font-bold text-red-800 mt-2'>${expense}</h3>
        </CardContent>
      </Card>

      <Card className='shadow-md border-slate-200'>
        <CardContent className='p-6'>
          <p className='text-sm text-slate-600 font-medium'>Saldo Actual</p>
          <h3
            className={`text-2xl font-bold mt-2 ${
              balance >= 0 ? 'text-blue-700' : 'text-red-700'
            }`}
          >
            ${balance}
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}

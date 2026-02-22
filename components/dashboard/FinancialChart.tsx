'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';

export default function FinancialChart({ summary }: any) {
  if (!summary) return null;

  const data = [
    { name: 'Ingresos', value: summary.income },
    { name: 'Gastos', value: summary.expense },
  ];

  return (
    <Card className='shadow-md'>
      <CardContent className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>Movimientos Financieros</h3>

        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

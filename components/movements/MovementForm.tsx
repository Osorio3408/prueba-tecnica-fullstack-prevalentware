'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MovementForm({ open, setOpen, onSuccess }: any) {
  const [form, setForm] = useState({
    concept: '',
    amount: '',
    date: '',
    type: 'INCOME',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await fetch('/api/movements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
        date: new Date(form.date).toISOString(),
      }),
    });

    form.amount = '';
    form.concept = '';
    form.date = '';
    form.type = 'INCOME';

    setLoading(false);
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-4 mt-4'>
          <Input
            placeholder='Concepto'
            value={form.concept}
            onChange={(e) => setForm({ ...form, concept: e.target.value })}
          />

          <Input
            placeholder='Monto'
            type='number'
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <Input
            type='datetime-local'
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <Select
            value={form.type}
            onValueChange={(value) => setForm({ ...form, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='INCOME'>Ingreso</SelectItem>
              <SelectItem value='EXPENSE'>Gasto</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Movimiento'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

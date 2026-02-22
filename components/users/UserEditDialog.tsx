'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function UserEditDialog({
  user,
  onClose,
  onSuccess,
}: {
  user: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [role, setRole] = useState(user.role);

  const handleSave = async () => {
    await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, role }),
    });

    onClose();
    onSuccess();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-4'>
          <Input
            placeholder='Nombre'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder='Teléfono'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ADMIN'>ADMIN</SelectItem>
              <SelectItem value='USER'>USER</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSave}>Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

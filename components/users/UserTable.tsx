'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function UserTable({
  users,
  onEdit,
}: {
  users: any[];
  onEdit: (user: any) => void;
}) {
  return (
    <div className='rounded-lg border overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className='text-right'>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center py-6'>
                Usuarios no encontrados
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>
                  <span
                    className={
                      user.role === 'ADMIN'
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600'
                    }
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => onEdit(user)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

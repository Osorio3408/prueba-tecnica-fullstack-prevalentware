'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function MovementTable({ movements }: { movements: any[] }) {
  const total = movements.reduce(
    (acc, movement) =>
      movement.type === 'INCOME'
        ? acc + Number(movement.amount)
        : acc - Number(movement.amount),
    0
  );

  return (
    <div className='flex flex-col gap-4'>
      <div className='rounded-lg border overflow-hidden  shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Usuario</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {movements.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='text-center py-10 text-slate-500'
                >
                  No movements found
                </TableCell>
              </TableRow>
            ) : (
              movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.concept}</TableCell>

                  <TableCell
                    className={
                      movement.type === 'INCOME'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    ${movement.amount}
                  </TableCell>

                  <TableCell>
                    {(() => {
                      const [year, month, day] = movement.date
                        .split('T')[0]
                        .split('-');
                      return `${day}/${month}/${year}`;
                    })()}
                  </TableCell>

                  <TableCell>{movement.user?.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* TOTAL SECTION */}
      {movements.length > 0 && (
        <div className='flex justify-end'>
          <div className='shadow-md rounded-lg px-6 py-3 border'>
            <span className='text-sm text-slate-400 mr-2'>Total Balance:</span>
            <span
              className={`text-lg font-bold ${
                total >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ${total}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

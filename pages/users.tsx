'use client';

import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import MainLayout from '@/components/layouts/MainLayout';
import UserTable from '@/components/users/UserTable';
import UserEditDialog from '@/components/users/UserEditDialog';
import { authClient } from '@/lib/auth/client';

export default function UsersPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.status === 401) {
      Router.push('/');
      return;
    }

    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    authClient.getSession().then((res: any) => {
      setSession(res);

      console.log(res);

      if (res?.data?.user?.role !== 'ADMIN') {
        router.push('/movements');
      }
    });

    fetchUsers();
  }, []);

  return (
    <MainLayout>
      <div className='bg-white p-8 rounded-xl shadow-md'>
        <h2 className='text-3xl font-bold mb-8'>Gestión de Usuarios</h2>

        {loading ? (
          <p className='text-gray-500'>
            Cargando usuarios...</p>
        ) : (
          <UserTable users={users} onEdit={(user) => setSelectedUser(user)} />
        )}
      </div>

      {selectedUser && (
        <UserEditDialog
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuccess={fetchUsers}
        />
      )}
    </MainLayout>
  );
}

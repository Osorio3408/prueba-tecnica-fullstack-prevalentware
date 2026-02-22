'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { authClient } from '@/lib/auth/client';
import { useEffect, useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import {CircleUser} from "lucide-react"

import { SidebarProvider } from '@/components/ui/sidebar';

import { LayoutDashboard, Users, BarChart3, LogOut } from 'lucide-react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    authClient.getSession().then(setSession);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <SidebarProvider>
    <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar className="border-r bg-background">
          <SidebarHeader className="px-6 py-4 border-b bg-muted/30">
            <h1 className='text-lg font-bold'>Gestión Financiera</h1>
            <div className='flex items-center gap-3 mt-4'>
{
  session?.data?.user?.image ? (
    <img
      src={session.data.user.image}
      alt={session.data.user.name}
      className='w-8 h-8 rounded-full object-cover'
    />
  ) : (
    <CircleUser />
)
}
            <p className='text-xs text-muted-foreground'>
              {session?.data?.user?.name}
            </p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {session?.data?.user && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive('/movements')}
                      >
                        <Link href='/movements'>
                          <LayoutDashboard size={18} />
                          <span>Movimientos</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {session?.data?.user?.role === 'ADMIN' && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive('/users')}
                        >
                          <Link href='/users'>
                            <Users size={18} />
                            <span>Usuarios</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive('/reports')}
                        >
                          <Link href='/reports'>
                            <BarChart3 size={18} />
                            <span>Reportes</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {session?.data?.user && (
            <SidebarFooter className='p-4 border-t'>
              <SidebarMenuButton className='text-red-500' onClick={handleLogout}>
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </SidebarMenuButton>
            </SidebarFooter>
          )}
        </Sidebar>

        <main className='flex-1 p-10 bg-background '>{children}</main>
      </div>
    </SidebarProvider>
  );
}

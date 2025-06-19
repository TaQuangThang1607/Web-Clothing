'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from '../components/SidebarAdmin';
import { useUser } from '../context/UserContext';
import HeaderAdmin from '../components/HeaderAdmin';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Kiểm tra quyền ADMIN
  useEffect(() => {
    setIsMounted(true);
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.role === 1) { // Sửa thành số 1
            setUser(parsedUser);
          } else {
            router.push('/unauthorized');
          }
        } catch (error) {
          console.error('Lỗi parse user từ localStorage:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    } else if (user?.role !== 1) {
      router.push('/unauthorized');
    }
  }, [user, router, setUser]);

  if (!isMounted) {
    return null;
  }

  if (user?.role !== 1) {
    return null;
  }


  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
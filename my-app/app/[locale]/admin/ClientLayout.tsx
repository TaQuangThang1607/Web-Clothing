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
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.role === 'ADMIN') {
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
    } else if (user?.role !== 'ADMIN') {
      router.push('/unauthorized');
    }
  }, [user, router]);

  if (!isMounted) {
    return null; // Hoặc loading spinner
  }

  if (user?.role !== 'ADMIN') {
    return null; // Đã xử lý chuyển hướng trong useEffect
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
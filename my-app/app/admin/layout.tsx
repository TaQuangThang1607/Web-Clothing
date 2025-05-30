'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';
import HeaderAdmin from '@/app/components/HeaderAdmin';
import SideBar from '../components/SideabarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUser();
  const router = useRouter();

  // Kiểm tra quyền ADMIN
  useEffect(() => {
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
          
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    } else if (user.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [user, setUser, router]);

  // Không render layout nếu không phải ADMIN
  if (!user || user.role !== 'ADMIN') {
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
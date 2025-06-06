import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata = {
  title: 'Quản trị - Bảng điều khiển',
  description: 'Bảng điều khiển quản trị cho ứng dụng'
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}

// ClientLayout được import từ một tệp riêng

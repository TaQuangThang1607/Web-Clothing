export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trang quản trị</h1>
      {children}
    </div>
  );
}
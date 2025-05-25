import HeaderAdmin from "../components/HeaderAdmin";
import SideBar from "../components/SideabarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}

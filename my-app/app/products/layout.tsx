import FooterPage from "../components/Footer";
import Header from "../components/Header";

export default function ProductsPageLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
          </div>
          <FooterPage />
        </div>
      );
}

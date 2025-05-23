import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import FooterPage from "./components/Footer";

export const metadata: Metadata = {
  title: "Shoes Online Store",
  description: "Cửa hàng bán giày",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">

        <Header />

        <main className="pt-20">
          {children}
        </main>
        <FooterPage />
      </body>
    </html>
  );
}
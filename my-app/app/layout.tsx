// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers"; // Phải là default import

export const metadata: Metadata = {
  title: "Shoes Online Store",
  description: "Cửa hàng bán giày",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
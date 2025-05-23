import type { Metadata } from "next";
import "./globals.css";


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


        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
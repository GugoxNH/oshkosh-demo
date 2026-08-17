import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oshkosh Demo",
  description: "Oshkosh Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
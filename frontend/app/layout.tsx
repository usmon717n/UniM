import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { AuthModalProvider } from "@/lib/contexts/auth-modal-context";
import { AuthModal } from "@/components/AuthModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UniM - Shu yerda va Hozir",
  description: "Barcha xizmatlar bir joyda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          <AuthModalProvider>
            {children}
            <AuthModal />
          </AuthModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

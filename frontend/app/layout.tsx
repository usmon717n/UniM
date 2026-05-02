import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { AuthModalProvider } from "@/lib/contexts/auth-modal-context";
import { LanguageProvider } from "@/lib/contexts/language-context";
import { AuthModal } from "@/components/AuthModal";
import SwipeNavigation from "@/components/SwipeNavigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Avimed - Here and Now",
  description: "All services in one place",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          <LanguageProvider>
          <AuthModalProvider>
            <SwipeNavigation>
              <PageTransition>
                {children}
              </PageTransition>
            </SwipeNavigation>
            <BottomNav />
            <AuthModal />
          </AuthModalProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

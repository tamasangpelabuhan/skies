import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../context/StoreContext";
import { AdminAuthProvider } from "../context/AdminAuthContext";
import { AppShell } from "../components/AppShell";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Skies by Nas — Toko Aplikasi Premium Terpercaya",
  description: "Semua aplikasi dalam satu tempat. Beli akun premium Netflix, Spotify, Canva Pro, YouTube Premium harga terjangkau dengan garansi penuh.",
  keywords: ["aplikasi premium", "netflix murah", "spotify premium", "canva pro", "youtube premium", "skies by nas"],
  icons: {
    icon: "/images/icone.jpg",
    shortcut: "/images/icone.jpg",
    apple: "/images/icone.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F5F1FF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F5F1FF] text-[#2F2552] font-sans selection:bg-[#4A3A85] selection:text-white flex flex-col">
        <StoreProvider>
          <AdminAuthProvider>
            <AppShell>
              {children}
            </AppShell>
          </AdminAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

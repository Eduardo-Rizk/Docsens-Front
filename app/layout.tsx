import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Docens | Marketplace de Aulões ao Vivo",
  description:
    "Docens conecta alunos a ex-alunos de instituições de elite para encontros acadêmicos ao vivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${manrope.variable}`}>
      <body className="bg-background text-foreground antialiased font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

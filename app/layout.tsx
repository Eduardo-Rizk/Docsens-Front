import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Docsens | Marketplace de Auloes ao Vivo",
  description:
    "Docsens conecta alunos a ex-alunos de instituicoes de elite para encontros academicos ao vivo. Plataforma industrial de aprendizado.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.className} ${spaceGrotesk.className}`}>
      <body className="bg-background text-foreground antialiased font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FocusFlow - Pomodoro Timer com Tracking de Distrações",
  description: "Timer Pomodoro gratuito que detecta distrações e mostra relatórios de produtividade. Mantenha o foco e melhore sua concentração.",
  keywords: ["pomodoro", "timer", "produtividade", "foco", "concentração"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased bg-background text-text font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

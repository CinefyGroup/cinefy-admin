import type React from "react";
import "./globals.css";
import { Questrial } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AuthProvider } from "@/context/auth-context";
import { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const questrial = Questrial({
  subsets: ["latin"],
  variable: "--font-questrial",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cinefy Admin",
  description: "Cinefy management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${questrial.className} ${questrial.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>
              <DashboardLayout>{children}</DashboardLayout>
              <Toaster />
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

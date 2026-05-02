"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import "./globals.css"; // 🔥 IMPORTANTE

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useAuthStore.getState().loadSession();
  }, []);

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
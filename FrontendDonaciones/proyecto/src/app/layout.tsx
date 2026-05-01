"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/stores/auth.store";
import "./globals.css";

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
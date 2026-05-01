"use client";

import React from "react";
import Aside from "../../components/aside.component";
import { useLayout } from "../hooks/useLayout";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const { title, route } = useLayout(pathname);

  return (
    <main className="min-h-screen overflow-auto bg-gray-50 font-sans text-gray-950">
      <Aside />

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6">
        <header className="mb-8 border-b border-gray-200 pb-6">
          <nav className="mb-6 flex flex-wrap gap-2">
            {route.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition duration-200 ${
                  pathname === item.path
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-500 hover:bg-white hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">Sección actual: {title}</p>
          </div>
        </header>

        <div className="space-y-6">{children}</div>
      </section>
    </main>
  );
}
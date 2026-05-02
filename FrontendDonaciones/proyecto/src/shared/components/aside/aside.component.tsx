import Link from "next/link";

export default function Aside() {
  return (
    <aside className="fixed left-0 top-0 z-50 w-full border-b border-gray-800 bg-gray-950 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-white">
          Donaciones
        </Link>

        <span className="text-sm font-medium text-yellow-300">
          Campañas solidarias
        </span>
      </div>
    </aside>
  );
}
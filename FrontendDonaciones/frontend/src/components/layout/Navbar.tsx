import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="container flex h-[72px] items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900">
          CampaignApp
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/campaigns" className="hover:text-blue-600">
            Campañas
          </Link>

          <Link href="/categories" className="hover:text-blue-600">
            Categorías
          </Link>

          <Link href="/login" className="hover:text-blue-600">
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
}
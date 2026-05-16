import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <section className="container">
        <div className="grid min-h-[calc(100vh-160px)] items-center gap-10 py-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Plataforma de campañas y donaciones
            </span>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Crea, gestiona y apoya campañas con transparencia.
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600">
              Centraliza campañas, categorías, donaciones y documentos en una
              sola plataforma. Los usuarios pueden crear campañas y los
              administradores pueden hacer seguimiento completo del sistema.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/campaigns"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Ver campañas
              </Link>

              <Link
                href="/campaigns/create"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Crear campaña
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 rounded-2xl bg-slate-100 p-6">
              <p className="mb-2 text-sm font-semibold text-slate-500">
                Resumen del sistema
              </p>

              <h2 className="text-2xl font-bold text-slate-950">
                Gestión limpia y organizada
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">
                  Campañas por categoría
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Salud, educación, tecnología, arte, emprendimiento, ambiente y
                  proyectos universitarios.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">
                  Donaciones registradas
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Cada donación queda asociada a un usuario registrado y a una
                  campaña específica.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">
                  Documentos en S3
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Los usuarios y administradores pueden asociar documentos a
                  cada campaña.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">
                  Auditoría administrativa
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  El sistema conserva trazabilidad de acciones importantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
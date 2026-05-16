type LoadingProps = {
  message?: string;
  fullPage?: boolean;
};

export function Loading({
  message = "Cargando...",
  fullPage = false,
}: LoadingProps) {
  if (fullPage) {
    return (
      <main className="page">
        <section className="container">
          <LoadingBox message={message} />
        </section>
      </main>
    );
  }

  return <LoadingBox message={message} />;
}

function LoadingBox({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

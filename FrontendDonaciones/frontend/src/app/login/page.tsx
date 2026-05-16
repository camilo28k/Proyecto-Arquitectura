import { LoginForm } from "@/components/forms/LoginForm";


export default function LoginPage() {
  return (
    <main className="page">
      <section className="container">
        <div className="auth-container">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-slate-950">
                Iniciar sesión
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Accede con tu correo y contraseña para gestionar tus campañas.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
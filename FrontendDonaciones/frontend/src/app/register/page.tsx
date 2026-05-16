import { RegisterForm } from "@/components/forms/RegisterForm";


export default function RegisterPage() {
  return (
    <main className="page">
      <section className="container">
        <div className="auth-container">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-slate-950">
                Crear cuenta
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Regístrate para crear campañas, donar y gestionar documentos.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
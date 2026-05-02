"use client";

import { useAuthCard } from "../../hooks/useAuthCard";

export default function AuthCard() {
  const {
    isRegister,
    name,
    email,
    password,
    isLoading,
    error,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
    toggleAuthMode,
  } = useAuthCard();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Plataforma web de donaciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          )}

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg border px-3 py-2"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gray-950 px-4 py-2 text-white"
          >
            {isLoading
              ? "Cargando..."
              : isRegister
                ? "Crear cuenta"
                : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="font-semibold text-gray-900 hover:underline"
          >
            {isRegister ? "Inicia sesión" : "Crear cuenta"}
          </button>
        </p>
      </section>
    </main>
  );
}
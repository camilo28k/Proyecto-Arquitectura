"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";

export function useAuthCard() {
  const router = useRouter();
  const { login, register, isLoading, error } = useAuthStore();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    const success = isRegister
      ? await register(cleanData)
      : await login({
          email: cleanData.email,
          password: cleanData.password,
        });

    if (success) {
      router.push("/dashboard");
    }
  }

  function toggleAuthMode() {
    setIsRegister((prev) => !prev);
  }

  return {
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
  };
}
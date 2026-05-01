"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/auth.store";

export default function Home() {
  const router = useRouter();
  const { user, loadSession } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      await loadSession();
      setIsReady(true);
    }
    init();
  }, [loadSession]);

  useEffect(() => {
    if (!isReady) return;

    if (!user) {
      router.replace("/auth");
    } else {
      router.replace("/dashboard");
    }
  }, [user, isReady, router]);

  return null;
}
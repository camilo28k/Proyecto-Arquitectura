"use client";

import { useEffect, useState } from "react";
import { useActivityStore } from "../store/activity.store";

export function useActivity() {
  const [objetivo, setObjetivo] = useState("");

  const {
    createActivity,
    fetchActivities,
    activities,
    activity,
    isLoading,
    error,
  } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanObjetivo = objetivo.trim();

    if (!cleanObjetivo) return;

    await createActivity(cleanObjetivo);
    setObjetivo("");
  }

  return {
    objetivo,
    setObjetivo,
    activities,
    activity,
    isLoading,
    error,
    handleSubmit,
  };
}
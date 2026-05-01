'use client';

import { useActivityStore } from '@/app/stores/activity.store';
import { useEffect, useState } from 'react';

export default function Activity() {
  const [objetivo, setObjetivo] = useState('');
  const { createActivity, fetchActivities, activities, activity, isLoading, error } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (objetivo.trim()) {
      await createActivity(objetivo.trim());
      setObjetivo('');
    }
  };

  return (
    <section className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'>
      <div className='flex flex-col gap-4 text-gray-900'>
        <div>
          <h3 className='text-xl font-semibold'>Objetivos de campañas</h3>
          <p className='text-sm text-gray-500'>
            Conecta el modulo de actividad con la pagina principal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='grid gap-2 sm:grid-cols-[1fr_auto]'>
          <input
            type='text'
            placeholder='Escribe un objetivo...'
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className='min-w-0 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500'
          />
          <button
            type='submit'
            className='rounded-md bg-gray-950 px-4 py-2 font-semibold text-white transition hover:bg-gray-800'
          >
            Crear
          </button>
        </form>

        {error && (
          <p className='rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
            {error}
          </p>
        )}

        {activity && (
          <p className='rounded-md bg-yellow-50 px-3 py-2 text-sm text-gray-700'>
            Ultimo objetivo creado: <strong>{activity.objetivo}</strong>
          </p>
        )}

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h4 className='font-semibold'>Historial</h4>
            {isLoading && <span className='text-sm text-gray-500'>Cargando...</span>}
          </div>

          {!isLoading && activities.length === 0 && (
            <p className='rounded-md border border-dashed border-gray-300 px-3 py-4 text-center text-sm text-gray-500'>
              Todavia no hay objetivos registrados.
            </p>
          )}

          {activities.map((item) => (
            <div
              key={item.id ?? item.objetivo}
              className='rounded-md border border-gray-200 px-3 py-2 text-sm'
            >
              {item.objetivo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

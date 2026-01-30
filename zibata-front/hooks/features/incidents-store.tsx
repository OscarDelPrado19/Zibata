/**
 * Store global de incidencias (mock local). Preparado para conectar backend.
 */

import { INCIDENT_TYPES, INITIAL_INCIDENTS } from '@/constants/features/incidents';
import type { Coordinates, Incident, IncidentStatus, IncidentType, TimelineEvent } from '@/types';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type CreateIncidentInput = {
  category: string;
  reason: string;
  description: string;
  coordinates: Coordinates | null;
  images: string[];
  videos: string[];
  reporter?: string;
};

interface IncidentsStoreValue {
  incidents: Incident[];
  addIncident: (payload: CreateIncidentInput) => Incident;
}

const IncidentsStoreContext = createContext<IncidentsStoreValue | null>(null);

const mapReasonToType = (reason: string): IncidentType => {
  if (reason === INCIDENT_TYPES.MAINTENANCE) {
    return 'MANTENIMIENTO';
  }
  if (reason === INCIDENT_TYPES.POWER_FAILURE) {
    return 'FALLA ENERGIA';
  }
  return 'OTRO';
};

const generateIncidentCode = (count: number, date: Date): string => {
  const number = String(count).padStart(3, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `ZARU-${number}-${month}${year}`;
};

const buildTimeline = (nowIso: string): TimelineEvent[] => [
  { id: '1', date: nowIso, description: 'REPORTE CREADO' },
];

const buildIncident = (payload: CreateIncidentInput, nextNumber: number): Incident => {
  const now = new Date();
  const nowIso = now.toISOString();
  const status: IncidentStatus = 'ABIERTO';

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: generateIncidentCode(nextNumber, now),
    type: mapReasonToType(payload.reason),
    date: nowIso.slice(0, 10),
    category: payload.category,
    reason: payload.reason,
    description: payload.description,
    status,
    coordinates: payload.coordinates,
    images: payload.images,
    videos: payload.videos,
    createdAt: nowIso,
    updatedAt: nowIso,
    reporter: payload.reporter ?? 'Residente',
    timeline: buildTimeline(nowIso),
  };
};

export const IncidentsProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);

  const addIncident = useCallback((payload: CreateIncidentInput): Incident => {
    const nextNumber = incidents.length + 1;
    const newIncident = buildIncident(payload, nextNumber);
    setIncidents((prev) => [newIncident, ...prev]);
    return newIncident;
  }, [incidents.length]);

  const value = useMemo<IncidentsStoreValue>(() => ({ incidents, addIncident }), [incidents, addIncident]);

  return (
    <IncidentsStoreContext.Provider value={value}>
      {children}
    </IncidentsStoreContext.Provider>
  );
};

export const useIncidentsStore = (): IncidentsStoreValue => {
  const context = useContext(IncidentsStoreContext);
  if (!context) {
    throw new Error('useIncidentsStore debe usarse dentro de IncidentsProvider');
  }
  return context;
};

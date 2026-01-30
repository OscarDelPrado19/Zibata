/**
 * Constantes y configuración para la pantalla de incidencias
 */

import type { Incident } from '@/types';

/**
 * Colores específicos para la feature de incidencias
 */
export const IncidentsColors = {
  dark: {
    headerBg: '#1F2937',
    cardBg: '#2D3748',
    cardBorder: '#4B5563',
    fabBg: '#3B82F6',
    fabText: '#FFFFFF',
    text: '#FFFFFF',
  },
  light: {
    headerBg: '#000000',
    cardBg: '#F3F4F6',
    cardBorder: '#E5E7EB',
    fabBg: '#FFFFFF',
    fabText: '#000000',
    text: '#000000',
  },
} as const;

/**
 * Datos iniciales de incidencias con detalles completos
 */
export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: '1',
    code: 'ZARU-001-0925',
    type: 'MANTENIMIENTO',
    date: '2025-09-19',
    category: 'EXTERNO',
    reason: 'MANTENIMIENTO',
    description: 'PRUEBA RESIDENTE',
    status: 'CERRADO',
    coordinates: { latitude: 19.432608, longitude: -99.133209 },
    images: [],
    videos: [],
    createdAt: '2025-09-19T10:30:00Z',
    updatedAt: '2025-09-19T15:45:00Z',
    reporter: 'Juan Pérez',
    timeline: [
      { id: '1', date: '2025-09-19T15:45:00Z', description: 'SE CERRÓ EL EVENTO' },
      { id: '2', date: '2025-09-19T14:20:00Z', description: 'PRUEBA DE CIERRE' },
      { id: '3', date: '2025-09-19T12:00:00Z', description: 'EL RESIDENTE SE ENCONTRÓ EN SITIO' },
      { id: '4', date: '2025-09-19T10:56:00Z', description: 'SE ASIGNÓ A responsable' },
    ],
  },
  {
    id: '2',
    code: 'ZARU-002-1025',
    type: 'FALLA ENERGIA',
    date: '2025-10-24',
    category: 'INTERNO',
    reason: 'FALLA ENERGIA',
    description: 'Corte de energía en zona norte del edificio',
    status: 'EN PROGRESO',
    coordinates: { latitude: 19.437893, longitude: -99.138456 },
    images: [],
    videos: [],
    createdAt: '2025-10-24T08:15:00Z',
    updatedAt: '2025-10-24T11:30:00Z',
    reporter: 'María García',
    timeline: [
      { id: '1', date: '2025-10-24T11:30:00Z', description: 'TÉCNICO EN SITIO' },
      { id: '2', date: '2025-10-24T10:00:00Z', description: 'ASIGNADO A TÉCNICO ELÉCTRICO' },
      { id: '3', date: '2025-10-24T08:15:00Z', description: 'REPORTE RECIBIDO' },
    ],
  },
  {
    id: '3',
    code: 'ZARU-003-1025',
    type: 'OTRO',
    date: '2025-10-25',
    category: 'EXTERNO',
    reason: 'OTRO',
    description: 'Puerta de acceso dañada en entrada principal',
    status: 'ABIERTO',
    coordinates: { latitude: 19.434567, longitude: -99.131234 },
    images: [],
    videos: [],
    createdAt: '2025-10-25T09:00:00Z',
    updatedAt: '2025-10-25T09:00:00Z',
    reporter: 'Carlos López',
    timeline: [
      { id: '1', date: '2025-10-25T09:00:00Z', description: 'REPORTE CREADO' },
    ],
  },
];

/**
 * Tipos de incidencias disponibles
 */
export const INCIDENT_TYPES = {
  MAINTENANCE: 'MANTENIMIENTO',
  POWER_FAILURE: 'FALLA ENERGIA',
  OTHER: 'OTRO',
} as const;

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
 * Datos iniciales de incidencias
 */
export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: '1',
    code: 'ZARU-001-0925',
    type: 'MANTENIMIENTO',
    date: '2025-09-19',
  },
  {
    id: '2',
    code: 'ZARU-002-1025',
    type: 'FALLA ENERGIA',
    date: '2025-10-24',
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

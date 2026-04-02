/**
 * Constantes y configuracion para la pantalla de vehiculos
 */

import type { VehicleRecord } from '@/types';

export const VehiclesColors = {
  light: {
    headerBg: '#000000',
    pageBg: '#FFFFFF',
    surfaceBg: '#FFFFFF',
    pillBg: '#F3F4F6',
    cardBg: '#F3F4F6',
    primaryText: '#111111',
    mutedText: '#6B7280',
    infoIcon: '#111111',
    fabBg: '#FFFFFF',
    fabText: '#111111',
  },
  dark: {
    headerBg: '#0B0B0B',
    pageBg: '#111827',
    surfaceBg: '#1F2937',
    pillBg: '#374151',
    cardBg: '#1F2937',
    primaryText: '#F9FAFB',
    mutedText: '#D1D5DB',
    infoIcon: '#F9FAFB',
    fabBg: '#1F2937',
    fabText: '#F9FAFB',
  },
} as const;

export const VEHICLE_PROPERTY_DEFAULT = 'INMUEBLE L1 P01';

export const VEHICLE_RECORDS: VehicleRecord[] = [
  {
    id: '1',
    label: 'PZA463 / SUZUKI RED',
    status: 'PENDIENTE',
    statusColor: '#E11D48',
  },
];

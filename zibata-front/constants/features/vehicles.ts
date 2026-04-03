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

export const VEHICLE_PROPERTY_OPTIONS = [
  { label: 'TODOS LOS INMUEBLES', value: 'TODOS LOS INMUEBLES' },
  { label: 'INMUEBLE L1 P01', value: 'INMUEBLE L1 P01' },
  { label: 'INMUEBLE L1 P02', value: 'INMUEBLE L1 P02' },
  { label: 'INMUEBLE L2 P10', value: 'INMUEBLE L2 P10' },
] as const;

export const VEHICLE_RECORDS: VehicleRecord[] = [
  {
    id: '1',
    label: 'PZA463 / SUZUKI ROJO',
    status: 'PENDIENTE',
    statusColor: '#E11D48',
    brand: 'SUZUKI',
    model: 'SWIFT',
    color: 'ROJO',
    year: '2020',
    plates: 'PZA463',
    property: 'INMUEBLE L1 P01',
    ownerType: 'PROPIETARIO',
    vehicleType: 'AUTOMOVIL',
    hasCirculationCard: true,
    hasOfficialId: true,
    createdAt: '2026-01-08T10:20:00.000Z',
  },
  {
    id: '2',
    label: 'HKK992 / NISSAN BLANCO',
    status: 'AUTORIZADO',
    statusColor: '#10B981',
    brand: 'NISSAN',
    model: 'VERSA',
    color: 'BLANCO',
    year: '2022',
    plates: 'HKK992',
    property: 'INMUEBLE L1 P01',
    ownerType: 'FAMILIAR',
    vehicleType: 'AUTOMOVIL',
    hasCirculationCard: true,
    hasOfficialId: true,
    createdAt: '2026-01-13T15:45:00.000Z',
  },
  {
    id: '3',
    label: 'TMR741 / YAMAHA NEGRO',
    status: 'REVISION',
    statusColor: '#F59E0B',
    brand: 'YAMAHA',
    model: 'FZ 2.0',
    color: 'NEGRO',
    year: '2021',
    plates: 'TMR741',
    property: 'INMUEBLE L1 P01',
    ownerType: 'VISITA',
    vehicleType: 'MOTOCICLETA',
    hasCirculationCard: false,
    hasOfficialId: true,
    createdAt: '2026-01-20T09:05:00.000Z',
  },
];

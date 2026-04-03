/**
 * Constantes y configuracion para la pantalla de control de acceso
 */

import type { AccessCredential, Employee, Provider } from '@/types';

export const AccessControlColors = {
  light: {
    headerBg: '#000000',
    pageBg: '#FFFFFF',
    sectionTitle: '#111827',
    pillBg: '#F3F4F6',
    pillText: '#111827',
    pillMuted: '#6B7280',
    cardBg: '#F3F4F6',
    cardText: '#111827',
    cardSubtle: '#6B7280',
    fabBg: '#FFFFFF',
    fabText: '#111111',
    iconDark: '#111111',
  },
  dark: {
    headerBg: '#0B0B0B',
    pageBg: '#111827',
    sectionTitle: '#F9FAFB',
    pillBg: '#1F2937',
    pillText: '#F9FAFB',
    pillMuted: '#9CA3AF',
    cardBg: '#1F2937',
    cardText: '#F9FAFB',
    cardSubtle: '#9CA3AF',
    fabBg: '#111827',
    fabText: '#F9FAFB',
    iconDark: '#111111',
  },
} as const;

export const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'JUAN PÉREZ LÓPEZ',
    date: '15-01-2025',
    statusColor: '#10B981',
    position: 'Seguridad',
  },
  {
    id: '2',
    name: 'MARÍA GARCÍA HERNÁNDEZ',
    date: '10-12-2024',
    statusColor: '#10B981',
    position: 'Mantenimiento',
  },
];

export const PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'CARLOS MARTÍNEZ SÁNCHEZ',
    date: '20-01-2025',
    statusColor: '#3B82F6',
    company: 'Plomería Express',
  },
  {
    id: '2',
    name: 'ANA LÓPEZ RODRÍGUEZ',
    date: '18-01-2025',
    statusColor: '#3B82F6',
    company: 'Jardinería Pro',
  },
];

export const ACCESS_CREDENTIALS: AccessCredential[] = [
  {
    id: '1',
    name: 'PRUEBA PRUEBA',
    date: '2026-01-26',
    statusColor: '#FDE047',
    folio: '2026-01-26/30422 22:17:03',
    property: 'DISCOVERY CENTER SN',
    visitorCount: 1,
    accessType: 'HOY',
    transportType: 'OTRO',
    qrValue: 'ZIBATA|FOLIO:2026-01-26/30422 22:17:03|VISITANTE:PRUEBA PRUEBA',
  },
];

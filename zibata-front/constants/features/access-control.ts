/**
 * Constantes y configuracion para la pantalla de control de acceso
 */

import type { AccessCredential } from '@/types';

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

export const ACCESS_CREDENTIALS: AccessCredential[] = [
  {
    id: '1',
    name: 'PRUEBA PRUEBA',
    date: '19-09-2025',
    statusColor: '#FDE047',
  },
];

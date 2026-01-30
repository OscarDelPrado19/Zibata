/**
 * Tipos compartidos para la aplicación
 */

export type IncidentType = 'MANTENIMIENTO' | 'FALLA ENERGIA' | 'OTRO';

export interface Incident {
  id: string;
  code: string;
  type: IncidentType;
  date: string;
}

export type ColorScheme = 'light' | 'dark';

export interface ThemedColors {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

/**
 * Tipos compartidos para la aplicación
 */

export interface Incident {
  id: string;
  code: string;
  type: 'MANTENIMIENTO' | 'FALLA ENERGIA' | 'OTRO';
  date: string;
}

export interface ScreenProps {
  navigation: any;
  route: any;
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

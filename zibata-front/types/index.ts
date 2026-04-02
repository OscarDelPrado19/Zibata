/**
 * Tipos compartidos para la aplicación
 */

export type IncidentType = 'MANTENIMIENTO' | 'FALLA ENERGIA' | 'OTRO';

export type IncidentStatus = 'ABIERTO' | 'EN PROGRESO' | 'CERRADO';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type TimelineEvent = {
  id: string;
  date: string;
  description: string;
};

export interface Incident {
  id: string;
  code: string;
  type: IncidentType;
  date: string;
  // Campos extendidos para detalle
  category?: string;
  reason?: string;
  description?: string;
  status?: IncidentStatus;
  coordinates?: Coordinates | null;
  images?: string[];
  videos?: string[];
  createdAt?: string;
  updatedAt?: string;
  timeline?: TimelineEvent[];
  reporter?: string;
}

export interface AccessCredential {
  id: string;
  name: string;
  date: string;
  statusColor: string;
}

export interface Employee {
  id: string;
  name: string;
  date: string;
  statusColor: string;
  position?: string;
}

export interface Provider {
  id: string;
  name: string;
  date: string;
  statusColor: string;
  company?: string;
}

export interface VehicleRecord {
  id: string;
  label: string;
  status: string;
  statusColor: string;
  brand?: string;
  model?: string;
  color?: string;
  year?: string;
  plates?: string;
  property?: string;
  ownerType?: string;
  vehicleType?: string;
  hasCirculationCard?: boolean;
  hasOfficialId?: boolean;
  circulationCardImageUri?: string;
  officialIdImageUri?: string;
  createdAt?: string;
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

/**
 * Hook personalizado para manejar la lógica de incidencias
 */

import { INITIAL_INCIDENTS } from '@/constants/features/incidents';
import type { Incident } from '@/types';
import { useCallback } from 'react';

interface UseIncidentsReturn {
  incidents: Incident[];
  handleIncidentPress: (id: string) => void;
  handleAddIncident: () => void;
}

export const useIncidents = (): UseIncidentsReturn => {
  const incidents = INITIAL_INCIDENTS;

  const handleIncidentPress = useCallback((id: string): void => {
    console.log('Incident pressed:', id);
    // TODO: Implementar navegación a detalle de incidencia
    // const router = useRouter();
    // router.push(`/incidents/${id}`);
  }, []);

  const handleAddIncident = useCallback((): void => {
    console.log('Add incident');
    // TODO: Implementar formulario para agregar incidencia
    // const router = useRouter();
    // router.push('/incidents/new');
  }, []);

  return {
    incidents,
    handleIncidentPress,
    handleAddIncident,
  };
};

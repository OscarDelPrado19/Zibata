/**
 * Hook personalizado para manejar la lógica de incidencias
 */

import { INITIAL_INCIDENTS } from '@/constants/features/incidents';
import type { Incident } from '@/types';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

interface UseIncidentsReturn {
  incidents: Incident[];
  handleIncidentPress: (id: string) => void;
  handleAddIncident: () => void;
}

export const useIncidents = (): UseIncidentsReturn => {
  const [incidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const router = useRouter();

  const handleIncidentPress = useCallback((id: string): void => {
    console.log('Incident pressed:', id);
  }, [router]);

  const handleAddIncident = useCallback((): void => {
    router.navigate('/modal/crear-incidencia');
  }, [router]);

  return {
    incidents,
    handleIncidentPress,
    handleAddIncident,
  };
};

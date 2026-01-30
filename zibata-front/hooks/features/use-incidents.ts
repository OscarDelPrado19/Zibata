/**
 * Hook personalizado para manejar la lógica de incidencias
 */

import { INITIAL_INCIDENTS } from '@/constants/features/incidents';
import type { Incident } from '@/types';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

interface UseIncidentsReturn {
  incidents: Incident[];
  selectedIncident: Incident | null;
  showDetailModal: boolean;
  handleIncidentPress: (id: string) => void;
  handleCloseDetailModal: () => void;
  handleAddIncident: () => void;
}

export const useIncidents = (): UseIncidentsReturn => {
  const [incidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const router = useRouter();

  const handleIncidentPress = useCallback((id: string): void => {
    const incident = incidents.find((inc) => inc.id === id);
    if (incident) {
      setSelectedIncident(incident);
      setShowDetailModal(true);
    }
  }, [incidents]);

  const handleCloseDetailModal = useCallback((): void => {
    setShowDetailModal(false);
    setSelectedIncident(null);
  }, []);

  const handleAddIncident = useCallback((): void => {
    router.navigate('/modal/crear-incidencia');
  }, [router]);

  return {
    incidents,
    selectedIncident,
    showDetailModal,
    handleIncidentPress,
    handleCloseDetailModal,
    handleAddIncident,
  };
};

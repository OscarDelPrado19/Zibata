/**
 * Componente para renderizar la lista de incidencias
 */

import type { Incident } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { EmptyState } from './empty-state';
import { IncidentCard } from './incident-card';

interface IncidentListProps {
  incidents: Incident[];
  onIncidentPress: (id: string) => void;
  cardBackgroundColor: string;
  cardBorderColor: string;
}

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  onIncidentPress,
  cardBackgroundColor,
  cardBorderColor,
}) => {
  if (incidents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {incidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          onPress={onIncidentPress}
          backgroundColor={cardBackgroundColor}
          borderColor={cardBorderColor}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

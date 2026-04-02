/**
 * Lista de registros de vehiculos
 */

import type { VehicleRecord } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VehicleCard } from './vehicle-card';

interface VehicleListProps {
  vehicles: VehicleRecord[];
  cardBackground: string;
  textColor: string;
  mutedTextColor: string;
}

export const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  cardBackground,
  textColor,
  mutedTextColor,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          backgroundColor={cardBackground}
          textColor={textColor}
          mutedTextColor={mutedTextColor}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 110,
    gap: 8,
  },
});

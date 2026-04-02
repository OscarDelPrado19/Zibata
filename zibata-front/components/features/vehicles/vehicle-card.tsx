/**
 * Tarjeta individual para registros de vehiculos
 */

import { ThemedText } from '@/components/themed-text';
import type { VehicleRecord } from '@/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface VehicleCardProps {
  vehicle: VehicleRecord;
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  backgroundColor,
  textColor,
  mutedTextColor,
}) => {
  return (
    <View style={[styles.card, { backgroundColor }]}> 
      <View style={[styles.statusBar, { backgroundColor: vehicle.statusColor }]} />
      <View style={styles.textBlock}>
        <ThemedText style={[styles.label, { color: textColor }]}>{vehicle.label}</ThemedText>
        <ThemedText style={[styles.status, { color: mutedTextColor }]}>{vehicle.status}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
  },
  statusBar: {
    width: 8,
    alignSelf: 'stretch',
  },
  textBlock: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 1,
  },
});

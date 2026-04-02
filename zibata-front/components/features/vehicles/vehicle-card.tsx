/**
 * Tarjeta individual para registros de vehiculos
 */

import { ThemedText } from '@/components/themed-text';
import type { VehicleRecord } from '@/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface VehicleCardProps {
  vehicle: VehicleRecord;
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
  onPress?: (vehicle: VehicleRecord) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  backgroundColor,
  textColor,
  mutedTextColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={() => onPress?.(vehicle)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${vehicle.label}`}
    >
      <View style={[styles.statusBar, { backgroundColor: vehicle.statusColor }]} />
      <View style={styles.textBlock}>
        <ThemedText style={[styles.label, { color: textColor }]}>{vehicle.label}</ThemedText>
        <ThemedText style={[styles.status, { color: mutedTextColor }]}>{vehicle.status}</ThemedText>
      </View>
    </TouchableOpacity>
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

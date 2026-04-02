/**
 * Boton flotante para agregar registro de vehiculo
 */

import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface VehicleFabProps {
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

export const VehicleFab: React.FC<VehicleFabProps> = ({
  onPress,
  backgroundColor,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Agregar vehiculo"
    >
      <ThemedText style={[styles.fabText, { color: textColor }]}>+</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    fontWeight: '300',
  },
});

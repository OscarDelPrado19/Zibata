/**
 * Componente que muestra estado vacío cuando no hay incidencias
 */

import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.message}>No hay incidencias registradas</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
  },
});

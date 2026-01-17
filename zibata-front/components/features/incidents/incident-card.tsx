/**
 * Componente reutilizable para renderizar una tarjeta de incidencia
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Incident } from '@/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IncidentCardProps {
  incident: Incident;
  onPress: (id: string) => void;
  backgroundColor: string;
  borderColor: string;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  onPress,
  backgroundColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor,
          borderColor,
        },
      ]}
      onPress={() => onPress(incident.id)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <ThemedText style={styles.code}>{incident.code}</ThemedText>
          <ThemedText style={styles.type}>{incident.type}</ThemedText>
        </View>
        <View style={styles.right}>
          <IconSymbol size={16} name="paperclip" color="#6B7280" />
          <ThemedText style={styles.date}>{incident.date}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
    marginRight: 0,
  },
});

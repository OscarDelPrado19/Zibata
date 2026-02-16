/**
 * Filtros superiores para control de acceso
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AccessControlFiltersProps {
  dateLabel: string;
  propertyLabel: string;
  pillBackground: string;
  textColor: string;
  mutedTextColor: string;
}

export const AccessControlFilters: React.FC<AccessControlFiltersProps> = ({
  dateLabel,
  propertyLabel,
  pillBackground,
  textColor,
  mutedTextColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.pill, { backgroundColor: pillBackground }]}>
        <IconSymbol size={16} name="calendar" color={mutedTextColor} />
        <ThemedText style={[styles.pillText, { color: textColor }]}>{dateLabel}</ThemedText>
      </View>
      <View style={[styles.pill, styles.pillWide, { backgroundColor: pillBackground }]}>
        <ThemedText style={[styles.pillText, { color: textColor }]}>{propertyLabel}</ThemedText>
        <IconSymbol size={16} name="chevron.down" color={mutedTextColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  pill: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  pillWide: {
    justifyContent: 'space-between',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

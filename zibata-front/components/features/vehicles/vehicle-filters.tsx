/**
 * Filtros y barra de contexto para la pantalla de vehiculos
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface VehicleFiltersProps {
  title: string;
  propertyLabel: string;
  surfaceColor: string;
  pillColor: string;
  textColor: string;
  iconColor: string;
  mutedTextColor: string;
  onBackPress?: () => void;
  onInfoPress?: () => void;
  onPropertyPress?: () => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  title,
  propertyLabel,
  surfaceColor,
  pillColor,
  textColor,
  iconColor,
  mutedTextColor,
  onBackPress,
  onInfoPress,
  onPropertyPress,
}) => {
  return (
    <View style={[styles.wrapper, { backgroundColor: surfaceColor }]}> 
      <View style={styles.titleRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBackPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Regresar"
        >
          <IconSymbol size={18} name="chevron.left" color={iconColor} />
        </TouchableOpacity>

        <ThemedText style={[styles.title, { color: textColor }]}>{title}</ThemedText>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onInfoPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Mostrar informacion"
        >
          <IconSymbol size={20} name="info.circle.fill" color={iconColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.propertyPill, { backgroundColor: pillColor }]}
        onPress={onPropertyPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Seleccionar inmueble"
      >
        <ThemedText style={[styles.propertyText, { color: textColor }]}>{propertyLabel}</ThemedText>
        <IconSymbol size={16} name="chevron.down" color={mutedTextColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 25,
    paddingBottom: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  iconButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
  },
  propertyPill: {
    minHeight: 40,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propertyText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});

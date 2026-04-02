/**
 * Filtros y barra de contexto para la pantalla de vehiculos
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export type VehiclePropertyOption = {
  label: string;
  value: string;
};

interface VehicleFiltersProps {
  title: string;
  propertyLabel: string;
  propertyOptions: VehiclePropertyOption[];
  surfaceColor: string;
  pillColor: string;
  textColor: string;
  iconColor: string;
  mutedTextColor: string;
  onBackPress?: () => void;
  onInfoPress?: () => void;
  onPropertyChange?: (value: string) => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  title,
  propertyLabel,
  propertyOptions,
  surfaceColor,
  pillColor,
  textColor,
  iconColor,
  mutedTextColor,
  onBackPress,
  onInfoPress,
  onPropertyChange,
}) => {
  const [showPropertyOptions, setShowPropertyOptions] = useState<boolean>(false);

  const openPropertyOptions = (): void => {
    setShowPropertyOptions(true);
  };

  const closePropertyOptions = (): void => {
    setShowPropertyOptions(false);
  };

  const handleSelectProperty = (value: string): void => {
    onPropertyChange?.(value);
    closePropertyOptions();
  };

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
        onPress={openPropertyOptions}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Seleccionar inmueble"
      >
        <ThemedText style={[styles.propertyText, { color: textColor }]}>{propertyLabel}</ThemedText>
        <IconSymbol size={16} name="chevron.down" color={mutedTextColor} />
      </TouchableOpacity>

      <Modal visible={showPropertyOptions} transparent animationType="fade" onRequestClose={closePropertyOptions}>
        <View style={styles.overlay}>
          <View style={[styles.sheet, { backgroundColor: surfaceColor }]}> 
            {propertyOptions.map((option) => {
              const isSelected = option.value === propertyLabel;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionRow}
                  onPress={() => handleSelectProperty(option.value)}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[styles.optionText, { color: textColor }]}>
                    {option.label}
                  </ThemedText>
                  {isSelected ? <IconSymbol size={16} name="checkmark" color={mutedTextColor} /> : null}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={styles.cancelButton} onPress={closePropertyOptions} activeOpacity={0.8}>
              <ThemedText style={[styles.cancelText, { color: mutedTextColor }]}>CANCELAR</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  optionRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  cancelButton: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});

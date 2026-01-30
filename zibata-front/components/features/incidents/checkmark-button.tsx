/**
 * Botón reutilizable con checkmark para acciones de confirmación
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface CheckmarkButtonProps {
  onPress: () => void;
  backgroundColor: string;
  iconColor: string;
  iconSize?: number;
  style?: ViewStyle;
}

export const CheckmarkButton: React.FC<CheckmarkButtonProps> = ({
  onPress,
  backgroundColor,
  iconColor,
  iconSize = 32,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
        },
        style,
      ]}
      activeOpacity={0.9}
    >
      <IconSymbol name="checkmark.circle.fill" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
});

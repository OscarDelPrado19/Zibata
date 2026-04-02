/**
 * Header principal para la pantalla de vehiculos
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface VehicleHeaderProps {
  backgroundColor: string;
  titleColor: string;
  iconColor: string;
}

export const VehicleHeader: React.FC<VehicleHeaderProps> = ({
  backgroundColor,
  titleColor,
  iconColor,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <IconSymbol size={32} name="car.fill" color={iconColor} />
        </View>
        <ThemedText style={[styles.title, { color: titleColor }]}>VEHÍCULOS</ThemedText>
        <View style={styles.trailingSpace} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  trailingSpace: {
    width: 44,
    height: 44,
  },
});

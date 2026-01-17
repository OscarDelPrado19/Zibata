/**
 * Componente header para la pantalla de incidencias
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IncidentHeaderProps {
  backgroundColor: string;
  iconColor: string;
}

export const IncidentHeader: React.FC<IncidentHeaderProps> = ({
  backgroundColor,
  iconColor,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <IconSymbol size={32} name="megaphone.fill" color={iconColor} />
        </View>
        <ThemedText style={styles.title}>REPORTE DE INCIDENTES</ThemedText>
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
    gap: 14,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    flex: 1,
    paddingLeft: 20,
  },
});

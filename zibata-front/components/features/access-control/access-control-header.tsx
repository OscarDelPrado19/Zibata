/**
 * Header para la pantalla de control de acceso
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface AccessControlHeaderProps {
  backgroundColor: string;
  titleColor: string;
  iconColor: string;
  surfaceColor: string;
  activeIndex?: number;
  onSelect?: (index: number) => void;
}

export const AccessControlHeader: React.FC<AccessControlHeaderProps> = ({
  backgroundColor,
  titleColor,
  iconColor,
  surfaceColor,
  activeIndex = 1,
  onSelect,
}) => {
  const icons = ['figure.walk', 'package.fill', 'person.text.rectangle'] as const;

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.logoBadge}>
            <IconSymbol size={20} name="key.fill" color={iconColor} />
          </View>
          <ThemedText style={[styles.title, { color: titleColor }]}>CONTROL DE ACCESO</ThemedText>
        </View>
      </View>
      <View style={styles.tabBar}>
        <View style={styles.tabRow}>
          {icons.map((icon, index) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                key={icon}
                style={[styles.tab, isActive && styles.tabActive, isActive && { backgroundColor: surfaceColor }]}
                onPress={onSelect ? () => onSelect(index) : undefined}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <View style={[styles.roundIcon, isActive && styles.roundIconActive]}>
                  <IconSymbol size={18} name={icon} color={isActive ? '#FFFFFF' : iconColor} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 0,
    marginBottom: 24,
    position: 'relative',
    overflow: 'visible',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -22,
    overflow: 'visible',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    paddingBottom: 0,
  },
  tab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  tabActive: {
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  roundIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 7,
  },
  roundIconActive: {
    backgroundColor: '#111111',
    borderWidth: 0,
  },
});

/**
 * Tarjeta de credencializacion
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { AccessCredential } from '@/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AccessControlCardProps {
  credential: AccessCredential;
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
}

export const AccessControlCard: React.FC<AccessControlCardProps> = ({
  credential,
  backgroundColor,
  textColor,
  mutedTextColor,
}) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={[styles.statusBar, { backgroundColor: credential.statusColor }]} />
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <IconSymbol size={16} name="person.text.rectangle" color="#FFFFFF" />
        </View>
        <View style={styles.textBlock}>
          <ThemedText style={[styles.name, { color: textColor }]}>{credential.name}</ThemedText>
          <ThemedText style={[styles.date, { color: mutedTextColor }]}>{credential.date}</ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBar: {
    width: 6,
    height: 32,
    borderRadius: 6,
    marginRight: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

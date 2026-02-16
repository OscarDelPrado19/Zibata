/**
 * Lista de credenciales
 */

import { ThemedText } from '@/components/themed-text';
import type { AccessCredential } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AccessControlCard } from './access-control-card';

interface AccessControlListProps {
  credentials: AccessCredential[];
  cardBackground: string;
  textColor: string;
  mutedTextColor: string;
}

export const AccessControlList: React.FC<AccessControlListProps> = ({
  credentials,
  cardBackground,
  textColor,
  mutedTextColor,
}) => {
  if (credentials.length === 0) {
    return (
      <View style={styles.emptyState}>
        <ThemedText style={[styles.emptyText, { color: mutedTextColor }]}>No hay credenciales</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {credentials.map((credential) => (
        <AccessControlCard
          key={credential.id}
          credential={credential}
          backgroundColor={cardBackground}
          textColor={textColor}
          mutedTextColor={mutedTextColor}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

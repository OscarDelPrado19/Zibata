/**
 * Lista de proveedores
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Provider } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface ProviderListProps {
  providers: Provider[];
  cardBackground: string;
  textColor: string;
  mutedTextColor: string;
}

export const ProviderList: React.FC<ProviderListProps> = ({
  providers,
  cardBackground,
  textColor,
  mutedTextColor,
}) => {
  if (providers.length === 0) {
    return (
      <View style={styles.emptyState}>
        <ThemedText style={[styles.emptyText, { color: mutedTextColor }]}>No hay proveedores registrados</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {providers.map((provider) => (
        <View key={provider.id} style={[styles.card, { backgroundColor: cardBackground }]}>
          <View style={[styles.statusBar, { backgroundColor: provider.statusColor }]} />
          <View style={styles.content}>
            <View style={styles.iconBadge}>
              <IconSymbol size={16} name="package.fill" color="#FFFFFF" />
            </View>
            <View style={styles.textBlock}>
              <ThemedText style={[styles.name, { color: textColor }]}>{provider.name}</ThemedText>
              <View style={styles.detailRow}>
                {provider.company && (
                  <ThemedText style={[styles.subtitle, { color: mutedTextColor }]}>{provider.company}</ThemedText>
                )}
                <ThemedText style={[styles.date, { color: mutedTextColor }]}> • {provider.date}</ThemedText>
              </View>
            </View>
          </View>
        </View>
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
});

/**
 * Lista de empleados
 */

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Employee } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface EmployeeListProps {
  employees: Employee[];
  cardBackground: string;
  textColor: string;
  mutedTextColor: string;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  cardBackground,
  textColor,
  mutedTextColor,
}) => {
  if (employees.length === 0) {
    return (
      <View style={styles.emptyState}>
        <ThemedText style={[styles.emptyText, { color: mutedTextColor }]}>No hay empleados registrados</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {employees.map((employee) => (
        <View key={employee.id} style={[styles.card, { backgroundColor: cardBackground }]}>
          <View style={[styles.statusBar, { backgroundColor: employee.statusColor }]} />
          <View style={styles.content}>
            <View style={styles.iconBadge}>
              <IconSymbol size={16} name="figure.walk" color="#FFFFFF" />
            </View>
            <View style={styles.textBlock}>
              <ThemedText style={[styles.name, { color: textColor }]}>{employee.name}</ThemedText>
              <View style={styles.detailRow}>
                {employee.position && (
                  <ThemedText style={[styles.subtitle, { color: mutedTextColor }]}>{employee.position}</ThemedText>
                )}
                <ThemedText style={[styles.date, { color: mutedTextColor }]}> • {employee.date}</ThemedText>
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

import {
  IncidentDetailModal,
  IncidentFAB,
  IncidentHeader,
  IncidentList,
} from '@/components/features/incidents';
import { ThemedView } from '@/components/themed-view';
import { IncidentsColors } from '@/constants/features/incidents';
import { useIncidents } from '@/hooks/features/use-incidents';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IncidenciasScreen(): React.ReactElement {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = IncidentsColors[isDark ? 'dark' : 'light'];
  const {
    incidents,
    selectedIncident,
    showDetailModal,
    handleIncidentPress,
    handleCloseDetailModal,
    handleAddIncident,
  } = useIncidents();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={{ flex: 1 }}>
        <IncidentHeader backgroundColor={colors.headerBg} iconColor={colors.text} />
        <IncidentList
          incidents={incidents}
          onIncidentPress={handleIncidentPress}
          cardBackgroundColor={colors.cardBg}
          cardBorderColor={colors.cardBorder}
        />
        <IncidentFAB
          onPress={handleAddIncident}
          backgroundColor={colors.fabBg}
          textColor={colors.fabText}
        />
      </ThemedView>

      <IncidentDetailModal
        visible={showDetailModal}
        incident={selectedIncident}
        onClose={handleCloseDetailModal}
        isDark={isDark}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

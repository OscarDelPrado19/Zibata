import {
  AccessControlFab,
  AccessControlFilters,
  AccessControlHeader,
  AccessControlList,
} from '@/components/features/access-control';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ACCESS_CREDENTIALS, AccessControlColors } from '@/constants/features/access-control';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ControlAccesoScreen(): React.ReactElement {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = AccessControlColors[isDark ? 'dark' : 'light'];
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const handleAddAccess = useCallback(() => {
    // TODO: integrar flujo de creacion
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={colors.headerBg} />
      <ThemedView style={[styles.content, { backgroundColor: colors.pageBg }]}>
        <AccessControlHeader
          backgroundColor={colors.headerBg}
          titleColor="#FFFFFF"
          iconColor={colors.iconDark}
          surfaceColor={colors.pageBg}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.sectionTitle }]}>CREDENCIALIZACION</ThemedText>
          <AccessControlFilters
            dateLabel="30 dic 2025"
            propertyLabel="INMUEBLE"
            pillBackground={colors.pillBg}
            textColor={colors.pillText}
            mutedTextColor={colors.pillMuted}
          />
          <AccessControlList
            credentials={ACCESS_CREDENTIALS}
            cardBackground={colors.cardBg}
            textColor={colors.cardText}
            mutedTextColor={colors.cardSubtle}
          />
        </View>
        <AccessControlFab
          onPress={handleAddAccess}
          backgroundColor={colors.fabBg}
          textColor={colors.fabText}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

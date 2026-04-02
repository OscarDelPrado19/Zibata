import {
  VehicleFab,
  VehicleFilters,
  VehicleHeader,
  VehicleList,
} from '@/components/features/vehicles';
import { ThemedView } from '@/components/themed-view';
import {
  VEHICLE_PROPERTY_DEFAULT,
  VehiclesColors,
} from '@/constants/features/vehicles';
import { useVehiclesStore } from '@/hooks/features/vehicles-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen(): React.ReactElement {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = VehiclesColors[isDark ? 'dark' : 'light'];
  const { vehicles } = useVehiclesStore();

  const handlePressAdd = useCallback(() => {
    router.push('/modal/registro-vehiculo' as any);
  }, [router]);

  const handlePressBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/(tabs)' as any);
  }, [router]);

  const handlePressInfo = useCallback(() => {
    // Placeholder visual: informacion pendiente de definicion funcional.
  }, []);

  const handlePressProperty = useCallback(() => {
    // Placeholder visual: selector de inmueble pendiente de integracion.
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={colors.headerBg} />

      <ThemedView style={[styles.content, { backgroundColor: colors.pageBg }]}>
        <VehicleHeader
          backgroundColor={colors.headerBg}
          titleColor="#FFFFFF"
          iconColor="#111111"
        />

        <ThemedView style={[styles.section, { backgroundColor: colors.surfaceBg }]}> 
          <VehicleFilters
            title="REGISTRO DE VEHÍCULOS"
            propertyLabel={VEHICLE_PROPERTY_DEFAULT}
            surfaceColor={colors.surfaceBg}
            pillColor={colors.pillBg}
            textColor={colors.primaryText}
            iconColor={colors.infoIcon}
            mutedTextColor={colors.mutedText}
            onBackPress={handlePressBack}
            onInfoPress={handlePressInfo}
            onPropertyPress={handlePressProperty}
          />

          <VehicleList
            vehicles={vehicles}
            cardBackground={colors.cardBg}
            textColor={colors.primaryText}
            mutedTextColor={colors.mutedText}
          />
        </ThemedView>

        <VehicleFab
          onPress={handlePressAdd}
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
  },
});

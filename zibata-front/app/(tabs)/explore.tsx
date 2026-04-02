import {
  VehicleFab,
  VehicleFilters,
  VehicleHeader,
  VehicleList,
} from '@/components/features/vehicles';
import { ThemedView } from '@/components/themed-view';
import {
  VEHICLE_PROPERTY_DEFAULT,
  VEHICLE_PROPERTY_OPTIONS,
  VehiclesColors,
} from '@/constants/features/vehicles';
import { useVehiclesStore } from '@/hooks/features/vehicles-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { VehicleRecord } from '@/types';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen(): React.ReactElement {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = VehiclesColors[isDark ? 'dark' : 'light'];
  const { vehicles } = useVehiclesStore();
  const [selectedProperty, setSelectedProperty] = useState<string>(VEHICLE_PROPERTY_DEFAULT);

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

  const handlePropertyChange = useCallback((value: string) => {
    setSelectedProperty(value);
  }, []);

  const handlePressVehicle = useCallback((vehicle: VehicleRecord) => {
    router.push({
      pathname: '/modal/detalle-vehiculo' as any,
      params: { id: vehicle.id },
    });
  }, [router]);

  const visibleVehicles = useMemo(() => {
    if (selectedProperty === 'TODOS LOS INMUEBLES') {
      return vehicles;
    }

    return vehicles.filter((vehicle) => vehicle.property === selectedProperty);
  }, [selectedProperty, vehicles]);

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
            propertyLabel={selectedProperty}
            propertyOptions={VEHICLE_PROPERTY_OPTIONS.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            surfaceColor={colors.surfaceBg}
            pillColor={colors.pillBg}
            textColor={colors.primaryText}
            iconColor={colors.infoIcon}
            mutedTextColor={colors.mutedText}
            onBackPress={handlePressBack}
            onInfoPress={handlePressInfo}
            onPropertyChange={handlePropertyChange}
          />

          <VehicleList
            vehicles={visibleVehicles}
            cardBackground={colors.cardBg}
            textColor={colors.primaryText}
            mutedTextColor={colors.mutedText}
            onVehiclePress={handlePressVehicle}
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

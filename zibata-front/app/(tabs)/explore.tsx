import {
  VehicleFab,
  VehicleFilters,
  VehicleHeader,
  VehicleList,
} from '@/components/features/vehicles';
import { ThemedView } from '@/components/themed-view';
import {
  VEHICLE_PROPERTY_DEFAULT,
  VEHICLE_RECORDS,
  VehiclesColors,
} from '@/constants/features/vehicles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen(): React.ReactElement {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = VehiclesColors[isDark ? 'dark' : 'light'];

  const handlePressAdd = useCallback(() => {
    // Se deja listo para conectar el modal de registro de vehiculos.
  }, []);

  const handlePressBack = useCallback(() => {
    // Placeholder visual: la pantalla es un tab raiz.
  }, []);

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
            vehicles={VEHICLE_RECORDS}
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

import {
    AccessControlFab,
    AccessControlFilters,
    AccessControlHeader,
    AccessControlList,
    AccessCredentialModal,
    EmployeeList,
    ProviderList,
} from '@/components/features/access-control';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AccessControlColors } from '@/constants/features/access-control';
import { useAccessControlStore } from '@/hooks/features/access-control-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { AccessCredential, Employee, Provider } from '@/types';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ControlAccesoScreen(): React.ReactElement {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = AccessControlColors[isDark ? 'dark' : 'light'];
  const { employees, providers, credentials } = useAccessControlStore();
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedCredential, setSelectedCredential] = useState<AccessCredential | null>(null);
  const [showCredentialModal, setShowCredentialModal] = useState<boolean>(false);

  const sectionConfig = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return {
          title: 'EMPLEADOS',
          route: '/modal/registro-empleado',
        };
      case 1:
        return {
          title: 'PROVEEDORES',
          route: '/modal/registro-proveedor',
        };
      case 2:
        return {
          title: 'CREDENCIALIZACION',
          route: '/modal/registro-visita',
        };
      default:
        return {
          title: 'CREDENCIALIZACION',
          route: '/modal/registro-visita',
        };
    }
  }, [activeIndex]);

  const handleAddAccess = useCallback((): void => {
    router.push(sectionConfig.route as any);
  }, [router, sectionConfig.route]);

  const handleCredentialPress = useCallback((credential: AccessCredential): void => {
    setSelectedCredential(credential);
    setShowCredentialModal(true);
  }, []);

  const handleEmployeePress = useCallback((employee: Employee): void => {
    const mappedCredential: AccessCredential = {
      id: `employee-${employee.id}`,
      name: employee.name,
      date: employee.date,
      statusColor: employee.statusColor,
      property: 'DISCOVERY CENTER SN',
      visitorCount: 1,
      accessType: employee.position ?? 'EMPLEADO',
      transportType: 'PERSONAL',
      folio: `${employee.date.replace(/-/g, '')}/${employee.id}`,
      qrValue: `ZIBATA|TIPO:EMPLEADO|ID:${employee.id}|NOMBRE:${employee.name}|FECHA:${employee.date}`,
    };

    handleCredentialPress(mappedCredential);
  }, [handleCredentialPress]);

  const handleProviderPress = useCallback((provider: Provider): void => {
    const mappedCredential: AccessCredential = {
      id: `provider-${provider.id}`,
      name: provider.name,
      date: provider.date,
      statusColor: provider.statusColor,
      property: 'DISCOVERY CENTER SN',
      visitorCount: 1,
      accessType: 'PROVEEDOR',
      transportType: provider.company ?? 'SERVICIO',
      folio: `${provider.date.replace(/-/g, '')}/${provider.id}`,
      qrValue: `ZIBATA|TIPO:PROVEEDOR|ID:${provider.id}|NOMBRE:${provider.name}|FECHA:${provider.date}`,
    };

    handleCredentialPress(mappedCredential);
  }, [handleCredentialPress]);

  const handleCloseCredentialModal = useCallback((): void => {
    setShowCredentialModal(false);
    setSelectedCredential(null);
  }, []);

  const renderContent = (): React.ReactElement => {
    switch (activeIndex) {
      case 0:
        return (
          <EmployeeList
            employees={employees}
            cardBackground={colors.cardBg}
            textColor={colors.cardText}
            mutedTextColor={colors.cardSubtle}
            onEmployeePress={handleEmployeePress}
          />
        );
      case 1:
        return (
          <ProviderList
            providers={providers}
            cardBackground={colors.cardBg}
            textColor={colors.cardText}
            mutedTextColor={colors.cardSubtle}
            onProviderPress={handleProviderPress}
          />
        );
      case 2:
        return (
          <AccessControlList
            credentials={credentials}
            cardBackground={colors.cardBg}
            textColor={colors.cardText}
            mutedTextColor={colors.cardSubtle}
            onCredentialPress={handleCredentialPress}
          />
        );
      default:
        return (
          <AccessControlList
            credentials={credentials}
            cardBackground={colors.cardBg}
            textColor={colors.cardText}
            mutedTextColor={colors.cardSubtle}
            onCredentialPress={handleCredentialPress}
          />
        );
    }
  };

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
          <ThemedText style={[styles.sectionTitle, { color: colors.sectionTitle }]}>
            {sectionConfig.title}
          </ThemedText>
          <AccessControlFilters
            dateLabel="30 dic 2025"
            propertyLabel="INMUEBLE"
            pillBackground={colors.pillBg}
            textColor={colors.pillText}
            mutedTextColor={colors.pillMuted}
          />
          {renderContent()}
        </View>
        <AccessControlFab
          onPress={handleAddAccess}
          backgroundColor={colors.fabBg}
          textColor={colors.fabText}
        />

        <AccessCredentialModal
          visible={showCredentialModal}
          credential={selectedCredential}
          onClose={handleCloseCredentialModal}
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

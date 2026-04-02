import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AccessControlColors } from '@/constants/features/access-control';
import { useVehiclesStore } from '@/hooks/features/vehicles-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { VehicleRecord } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const getParamValue = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
};

const formatDate = (value?: string): string => {
  if (!value) {
    return 'SIN FECHA';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'SIN FECHA';
  }

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).toUpperCase();
};

const DetailField = ({ label, value, cardBorder, colors }: {
  label: string;
  value: string;
  cardBorder: string;
  colors: { cardBg: string };
}): React.ReactElement => {
  return (
    <View style={styles.fieldContainer}>
      <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
      <View style={[styles.fieldValueContainer, { backgroundColor: colors.cardBg, borderColor: cardBorder }]}>
        <ThemedText style={styles.fieldValue}>{value || 'NO DISPONIBLE'}</ThemedText>
      </View>
    </View>
  );
};

export default function DetalleVehiculoModal(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = AccessControlColors[isDark ? 'dark' : 'light'];
  const cardBorder = isDark ? '#374151' : '#E5E7EB';
  const { vehicles } = useVehiclesStore();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const vehicleId = getParamValue(params.id);
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [previewUri, setPreviewUri] = React.useState<string>('');

  const vehicle = useMemo<VehicleRecord | undefined>(() => {
    return vehicles.find((item) => item.id === vehicleId);
  }, [vehicles, vehicleId]);

  const circulationStatus = vehicle?.circulationCardImageUri ? 'CARGADO' : 'PENDIENTE';
  const idStatus = vehicle?.officialIdImageUri ? 'CARGADO' : 'PENDIENTE';

  const openPreview = (uri: string): void => {
    setPreviewUri(uri);
    setPreviewVisible(true);
  };

  const closePreview = (): void => {
    setPreviewVisible(false);
    setPreviewUri('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={colors.headerBg} />
      <ThemedView style={[styles.content, { backgroundColor: colors.pageBg }]}>
        <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
          <View style={styles.headerRow}>
            <View style={styles.headerIcon}>
              <IconSymbol size={22} name="car.fill" color={colors.iconDark} />
            </View>
            <ThemedText style={styles.headerTitle}>DETALLE DE VEHÍCULO</ThemedText>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol size={18} name="chevron.right" color="#111111" style={styles.backIcon} />
            </TouchableOpacity>
            <ThemedText style={styles.sectionTitle}>INFORMACIÓN REGISTRADA</ThemedText>
          </View>

          {!vehicle ? (
            <View style={[styles.emptyStateCard, { backgroundColor: colors.cardBg, borderColor: cardBorder }]}>
              <ThemedText style={styles.emptyStateTitle}>Vehículo no encontrado</ThemedText>
              <ThemedText style={styles.emptyStateText}>
                No fue posible cargar la información. Regresa a la lista e inténtalo nuevamente.
              </ThemedText>
            </View>
          ) : (
            <>
              <DetailField label="MARCA" value={vehicle.brand ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="MODELO" value={vehicle.model ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="COLOR" value={vehicle.color ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="AÑO" value={vehicle.year ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="PLACAS" value={vehicle.plates ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="INMUEBLE" value={vehicle.property ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="PROPIETARIO" value={vehicle.ownerType ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="TIPO DE VEHÍCULO" value={vehicle.vehicleType ?? ''} cardBorder={cardBorder} colors={colors} />
              <DetailField label="ESTATUS" value={vehicle.status} cardBorder={cardBorder} colors={colors} />
              <DetailField label="FECHA DE REGISTRO" value={formatDate(vehicle.createdAt)} cardBorder={cardBorder} colors={colors} />

              <View style={styles.documentsRow}>
                <View style={styles.documentItem}>
                  {vehicle.circulationCardImageUri ? (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => openPreview(vehicle.circulationCardImageUri ?? '')}
                    >
                      <Image source={{ uri: vehicle.circulationCardImageUri }} style={styles.documentImage} />
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.documentIcon, styles.documentPending]}>
                      <IconSymbol size={20} name="exclamationmark.triangle.fill" color="#FFFFFF" />
                    </View>
                  )}
                  <ThemedText style={styles.documentLabel}>TARJETA DE CIRCULACIÓN</ThemedText>
                  <ThemedText style={styles.documentStatus}>{circulationStatus}</ThemedText>
                </View>

                <View style={styles.documentItem}>
                  {vehicle.officialIdImageUri ? (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => openPreview(vehicle.officialIdImageUri ?? '')}
                    >
                      <Image source={{ uri: vehicle.officialIdImageUri }} style={styles.documentImage} />
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.documentIcon, styles.documentPending]}>
                      <IconSymbol size={20} name="exclamationmark.triangle.fill" color="#FFFFFF" />
                    </View>
                  )}
                  <ThemedText style={styles.documentLabel}>IDENTIFICACIÓN OFICIAL</ThemedText>
                  <ThemedText style={styles.documentStatus}>{idStatus}</ThemedText>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.headerBg }]}
            onPress={() => router.back()}
            activeOpacity={0.9}
          >
            <ThemedText style={styles.submitText}>CERRAR</ThemedText>
          </TouchableOpacity>

          <View style={{ height: insets.bottom + 16 }} />
        </ScrollView>

        <ImageViewing
          images={previewUri ? [{ uri: previewUri }] : []}
          imageIndex={0}
          visible={previewVisible}
          onRequestClose={closePreview}
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
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#FFFFFF',
  },
  formContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#111827',
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  fieldValueContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  documentsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
    marginBottom: 12,
  },
  documentItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  documentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentReady: {
    backgroundColor: '#16A34A',
  },
  documentPending: {
    backgroundColor: '#DC2626',
  },
  documentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  documentStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.2,
  },
  emptyStateCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  emptyStateText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
});
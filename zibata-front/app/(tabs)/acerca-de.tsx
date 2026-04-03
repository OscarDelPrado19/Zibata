import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FeatureItem = {
  id: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
};

const ABOUT_TITLE = 'APLICACION ZIBATA 2.0';
const ABOUT_TEXT =
  'Aplicacion movil creada para el uso EXCLUSIVO de los Residentes del Fraccionamiento Zibata para facilitarles el pago de sus cuotas de mantenimiento externo, la reserva de sus amenidades, el acceso mediante codigos QR de sus visitas y proveedores, el seguimiento a los reportes de incidencias dentro del fraccionamiento, el registro de sus vehiculos, la credencializacion de sus empleados asi como apertura una linea de comunicacion directa con la Asociacion de Colonos para la atencion, apoyo y seguimiento de dudas o quejas.';

const FEATURE_ITEMS: FeatureItem[] = [
  { id: '1', icon: 'qrcode-scan', label: 'Accesos con QR' },
  { id: '2', icon: 'car-outline', label: 'Registro de vehiculos' },
  { id: '3', icon: 'alert-circle-outline', label: 'Reporte de incidencias' },
  { id: '4', icon: 'home-city-outline', label: 'Servicios para residentes' },
];

export default function AcercaDeScreen(): React.ReactElement {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ACERCA DE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.brandRow}>
            <Image
              source={require('@/assets/images/zibata.png')}
              style={styles.brandLogo}
              contentFit="contain"
            />
            <View style={styles.brandTextBlock}>
              <Text style={styles.appTitle}>{ABOUT_TITLE}</Text>
              <Text style={styles.appVersion}>Version 2.0</Text>
            </View>
          </View>

          <Text style={styles.description}>{ABOUT_TEXT}</Text>

          <View style={styles.featuresGrid}>
            {FEATURE_ITEMS.map((item) => (
              <View key={item.id} style={styles.featurePill}>
                <MaterialCommunityIcons name={item.icon} size={16} color="#111111" />
                <Text style={styles.featureText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.galleryCard}>
          <Text style={styles.galleryTitle}>VISTAS DE LA APLICACION</Text>
          <View style={styles.galleryGrid}>
            <View style={styles.galleryItem}>
              <Image
                source={require('@/assets/images/Inicio.jpeg')}
                style={styles.galleryImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.galleryItem}>
              <Image
                source={require('@/assets/images/ControlAcceso.jpeg')}
                style={styles.galleryImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.galleryItem}>
              <Image
                source={require('@/assets/images/Menu.jpeg')}
                style={styles.galleryImage}
                contentFit="contain"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.manualRow} activeOpacity={0.8}>
          <MaterialCommunityIcons name="book-open-page-variant" size={22} color="#111111" />
          <Text style={styles.manualText}>MANUAL</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#6B7280" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    height: 56,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginLeft: 8,
  },
  content: {
    padding: 14,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  brandLogo: {
    width: 54,
    height: 54,
    borderRadius: 12,
  },
  brandTextBlock: {
    flex: 1,
  },
  appTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  appVersion: {
    marginTop: 2,
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
  },
  description: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '500',
  },
  featuresGrid: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  featureText: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },
  galleryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
  },
  galleryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  galleryGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  galleryItem: {
    flex: 1,
    aspectRatio: 9 / 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  manualRow: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  manualText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.2,
    flex: 1,
  },
});

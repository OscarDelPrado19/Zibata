import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AccessControlColors } from '@/constants/features/access-control';
import { useVehiclesStore } from '@/hooks/features/vehicles-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type SelectOption = {
  label: string;
  value: string;
};

const BRAND_OPTIONS: SelectOption[] = [
  { label: 'NISSAN', value: 'NISSAN' },
  { label: 'SUZUKI', value: 'SUZUKI' },
  { label: 'TOYOTA', value: 'TOYOTA' },
  { label: 'HONDA', value: 'HONDA' },
];

const OWNER_OPTIONS: SelectOption[] = [
  { label: 'PROPIETARIO', value: 'PROPIETARIO' },
  { label: 'INQUILINO', value: 'INQUILINO' },
  { label: 'VISITA', value: 'VISITA' },
];

const TYPE_OPTIONS: SelectOption[] = [
  { label: 'AUTOMOVIL', value: 'AUTOMOVIL' },
  { label: 'MOTOCICLETA', value: 'MOTOCICLETA' },
  { label: 'CAMIONETA', value: 'CAMIONETA' },
];

const PROPERTY_OPTIONS: SelectOption[] = [
  { label: 'INMUEBLE L1 P01', value: 'INMUEBLE L1 P01' },
  { label: 'INMUEBLE L1 P02', value: 'INMUEBLE L1 P02' },
  { label: 'INMUEBLE L2 P10', value: 'INMUEBLE L2 P10' },
];

export default function RegistroVehiculoModal(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = AccessControlColors[isDark ? 'dark' : 'light'];
  const cardBorder = isDark ? '#374151' : '#E5E7EB';
  const { addVehicle } = useVehiclesStore();

  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [vehicleColor, setVehicleColor] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [plates, setPlates] = useState<string>('');
  const [property, setProperty] = useState<string>('INMUEBLE L1 P01');
  const [ownerType, setOwnerType] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [acceptRules, setAcceptRules] = useState<boolean>(false);

  const [circulationCardImage, setCirculationCardImage] = useState<string | null>(null);
  const [officialIdImage, setOfficialIdImage] = useState<string | null>(null);

  const [activeOptions, setActiveOptions] = useState<SelectOption[] | null>(null);
  const [activeSetter, setActiveSetter] = useState<((value: string) => void) | null>(null);

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const currentYear = new Date().getFullYear();

  const openSelect = (options: SelectOption[], setter: (value: string) => void): void => {
    setActiveOptions(options);
    setActiveSetter(() => setter);
  };

  const closeSelect = (): void => {
    setActiveOptions(null);
    setActiveSetter(null);
  };

  const handleSelect = (value: string): void => {
    if (activeSetter) {
      activeSetter(value);
    }
    closeSelect();
  };

  const openAlert = (message: string): void => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const pickImage = async (setter: (uri: string) => void): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      openAlert('Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setter(result.assets[0].uri);
    }
  };

  const normalizeSpaces = (value: string): string => value.replace(/\s+/g, ' ').trim();

  const handleModelChange = (value: string): void => {
    setModel(value.toUpperCase().slice(0, 30));
  };

  const handleColorChange = (value: string): void => {
    setVehicleColor(value.toUpperCase().slice(0, 20));
  };

  const handleYearChange = (value: string): void => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setYear(digits);
  };

  const handlePlatesChange = (value: string): void => {
    const normalized = value
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, '')
      .slice(0, 10);
    setPlates(normalized);
  };

  const hasError = (value: string): boolean => showErrors && !value.trim();

  const handleSave = (): void => {
    const normalizedModel = normalizeSpaces(model).toUpperCase();
    const normalizedColor = normalizeSpaces(vehicleColor).toUpperCase();
    const normalizedPlates = plates.trim().toUpperCase();
    const yearNumber = Number(year);

    if (!brand.trim()) {
      setShowErrors(true);
      openAlert('Selecciona la marca para continuar.');
      return;
    }
    if (!normalizedModel) {
      setShowErrors(true);
      openAlert('Ingresa el modelo para continuar.');
      return;
    }
    if (normalizedModel.length < 2) {
      setShowErrors(true);
      openAlert('El modelo debe tener al menos 2 caracteres.');
      return;
    }
    if (!/^[A-Z0-9 .-]{2,30}$/.test(normalizedModel)) {
      setShowErrors(true);
      openAlert('El modelo contiene caracteres no permitidos.');
      return;
    }
    if (!normalizedColor) {
      setShowErrors(true);
      openAlert('Ingresa el color para continuar.');
      return;
    }
    if (!/^[A-ZÁÉÍÓÚÜÑ ]{2,20}$/.test(normalizedColor)) {
      setShowErrors(true);
      openAlert('El color debe contener solo letras y espacios (2 a 20).');
      return;
    }
    if (!year.trim()) {
      setShowErrors(true);
      openAlert('Ingresa el año para continuar.');
      return;
    }
    if (!/^\d{4}$/.test(year) || yearNumber < 1980 || yearNumber > currentYear + 1) {
      setShowErrors(true);
      openAlert(`Ingresa un año válido entre 1980 y ${currentYear + 1}.`);
      return;
    }
    if (!normalizedPlates) {
      setShowErrors(true);
      openAlert('Ingresa las placas para continuar.');
      return;
    }
    if (!/^[A-Z0-9-]{5,10}$/.test(normalizedPlates)) {
      setShowErrors(true);
      openAlert('Las placas deben tener de 5 a 10 caracteres alfanuméricos.');
      return;
    }
    if (!ownerType.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el tipo de propietario.');
      return;
    }
    if (!vehicleType.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el tipo de vehículo.');
      return;
    }
    if (!acceptRules) {
      setShowErrors(true);
      openAlert('Debes aceptar el reglamento para guardar.');
      return;
    }

    addVehicle({
      brand,
      model: normalizedModel,
      color: normalizedColor,
      year,
      plates: normalizedPlates,
      property,
      ownerType,
      vehicleType,
      hasCirculationCard: Boolean(circulationCardImage),
      hasOfficialId: Boolean(officialIdImage),
      circulationCardImageUri: circulationCardImage ?? undefined,
      officialIdImageUri: officialIdImage ?? undefined,
    });

    router.back();
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
            <ThemedText style={styles.headerTitle}>REGISTRO DE VEHÍCULOS</ThemedText>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol size={18} name="chevron.right" color="#111111" style={styles.backIcon} />
            </TouchableOpacity>
            <ThemedText style={styles.sectionTitle}>DATOS DEL VEHÍCULO</ThemedText>
          </View>

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(brand) && styles.fieldError,
            ]}
            onPress={() => openSelect(BRAND_OPTIONS, setBrand)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{brand || 'MARCA'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(model) && styles.fieldError,
            ]}
            value={model}
            onChangeText={handleModelChange}
            placeholder="MODELO"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            maxLength={30}
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(vehicleColor) && styles.fieldError,
            ]}
            value={vehicleColor}
            onChangeText={handleColorChange}
            placeholder="COLOR"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            maxLength={20}
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(year) && styles.fieldError,
            ]}
            value={year}
            onChangeText={handleYearChange}
            placeholder="AÑO"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            maxLength={4}
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(plates) && styles.fieldError,
            ]}
            value={plates}
            onChangeText={handlePlatesChange}
            placeholder="PLACAS"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            maxLength={10}
          />

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
            ]}
            onPress={() => openSelect(PROPERTY_OPTIONS, setProperty)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{property}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(ownerType) && styles.fieldError,
            ]}
            onPress={() => openSelect(OWNER_OPTIONS, setOwnerType)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{ownerType || 'TIPO DE PROPIETARIO'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(vehicleType) && styles.fieldError,
            ]}
            onPress={() => openSelect(TYPE_OPTIONS, setVehicleType)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{vehicleType || 'TIPO DE VEHÍCULO'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <View style={styles.camerasRow}>
            <TouchableOpacity
              style={styles.cameraButton}
              activeOpacity={0.8}
              onPress={() => pickImage(setCirculationCardImage)}
            >
              <View style={styles.cameraIcon}>
                {circulationCardImage ? (
                  <Image source={{ uri: circulationCardImage }} style={styles.cameraImage} />
                ) : (
                  <IconSymbol size={24} name="camera.fill" color="#FFFFFF" />
                )}
              </View>
              <ThemedText style={styles.cameraLabel}>TARJETA DE CIRCULACIÓN</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              activeOpacity={0.8}
              onPress={() => pickImage(setOfficialIdImage)}
            >
              <View style={styles.cameraIcon}>
                {officialIdImage ? (
                  <Image source={{ uri: officialIdImage }} style={styles.cameraImage} />
                ) : (
                  <IconSymbol size={24} name="camera.fill" color="#FFFFFF" />
                )}
              </View>
              <ThemedText style={styles.cameraLabel}>IDENTIFICACIÓN OFICIAL</ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.checkboxField, showErrors && !acceptRules && styles.checkboxError]}
            onPress={() => setAcceptRules(!acceptRules)}
            activeOpacity={0.6}
          >
            <View style={[styles.checkbox, acceptRules && styles.checkboxChecked]}>
              {acceptRules && (
                <IconSymbol size={18} name="checkmark" color="#FFFFFF" />
              )}
            </View>
            <ThemedText style={styles.checkboxLabel}>ACEPTAR REGLAMENTO</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.headerBg }]}
            onPress={handleSave}
            activeOpacity={0.9}
          >
            <ThemedText style={styles.submitText}>GUARDAR</ThemedText>
          </TouchableOpacity>

          <View style={{ height: insets.bottom + 16 }} />
        </ScrollView>
      </ThemedView>

      <Modal visible={Boolean(activeOptions)} transparent animationType="fade">
        <View style={styles.optionOverlay}>
          <View style={[styles.optionCard, { backgroundColor: colors.pageBg }]}>
            {activeOptions?.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionItem}
                onPress={() => handleSelect(option.value)}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.optionText}>{option.label}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.optionItem, styles.optionCancel]}
              onPress={closeSelect}
              activeOpacity={0.8}
            >
              <ThemedText style={[styles.optionText, styles.optionCancelText]}>CANCELAR</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showAlert} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <View style={[styles.alertCard, { backgroundColor: colors.pageBg, borderColor: cardBorder }]}>
            <View style={styles.alertIconWrapper}>
              <IconSymbol name="exclamationmark.triangle.fill" size={28} color="#F59E0B" />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.alertTitle}>Atención</ThemedText>
            <ThemedText style={styles.alertMessage}>{alertMessage}</ThemedText>
            <TouchableOpacity
              onPress={() => setShowAlert(false)}
              style={[styles.alertButton, { backgroundColor: colors.headerBg }]}
              activeOpacity={0.9}
            >
              <ThemedText style={styles.alertButtonText}>Entendido</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  selectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  inputField: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  fieldError: {
    borderColor: '#EF4444',
  },
  checkboxField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkboxError: {
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  cameraButton: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  camerasRow: {
    paddingTop: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  cameraIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  cameraLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.3,
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
  optionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  optionCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  optionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
  },
  optionCancel: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  optionCancelText: {
    color: '#EF4444',
  },
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 24,
  },
  alertCard: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  alertIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    marginBottom: 6,
    fontSize: 16,
  },
  alertMessage: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 16,
  },
  alertButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  alertButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

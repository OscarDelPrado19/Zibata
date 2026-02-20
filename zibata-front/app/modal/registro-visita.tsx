import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AccessControlColors } from '@/constants/features/access-control';
import { useAccessControlStore } from '@/hooks/features/access-control-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
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

const PROPERTY_OPTIONS: SelectOption[] = [
  { label: 'INMUEBLE', value: 'INMUEBLE' },
  { label: 'CASA 12', value: 'CASA 12' },
  { label: 'TORRE A', value: 'TORRE A' },
];

const DATE_PRESETS: SelectOption[] = [
  { label: 'HOY', value: 'HOY' },
  { label: 'MAÑANA', value: 'MAÑANA' },
];

const TRANSPORT_OPTIONS: SelectOption[] = [
  { label: 'AUTO', value: 'AUTO' },
  { label: 'PIE', value: 'PIE' },
  { label: 'MOTO', value: 'MOTO' },
];

export default function RegistroVisitaModal(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = AccessControlColors[isDark ? 'dark' : 'light'];
  const cardBorder = isDark ? '#374151' : '#E5E7EB';
  const { addVisit } = useAccessControlStore();

  const [property, setProperty] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [companions, setCompanions] = useState<string>('');
  const [datePreset, setDatePreset] = useState<string>('HOY');
  const [visitDate, setVisitDate] = useState<Date | null>(new Date());
  const [transport, setTransport] = useState<string>('');
  const [activeOptions, setActiveOptions] = useState<SelectOption[] | null>(null);
  const [activeSetter, setActiveSetter] = useState<((value: string) => void) | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const openAlert = (message: string): void => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hasError = (value: string): boolean => showErrors && !value.trim();
  const hasDateError = (value: Date | null): boolean => showErrors && !value;
  const toStartOfDay = (value: Date): Date => new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const applyDatePreset = (value: string): void => {
    setDatePreset(value);
    const baseDate = new Date();
    if (value === 'MAÑANA') {
      baseDate.setDate(baseDate.getDate() + 1);
    }
    setVisitDate(baseDate);
  };

  const handleSubmit = (): void => {
    if (!property.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el inmueble para continuar.');
      return;
    }
    if (!firstName.trim()) {
      setShowErrors(true);
      openAlert('Agrega el nombre de la visita para continuar.');
      return;
    }
    if (!lastName.trim()) {
      setShowErrors(true);
      openAlert('Agrega el apellido paterno para continuar.');
      return;
    }
    if (!motherLastName.trim()) {
      setShowErrors(true);
      openAlert('Agrega el apellido materno para continuar.');
      return;
    }
    if (!phone.trim()) {
      setShowErrors(true);
      openAlert('Agrega el telefono para continuar.');
      return;
    }
    if (!companions.trim()) {
      setShowErrors(true);
      openAlert('Agrega el numero de acompanantes para continuar.');
      return;
    }
    if (!datePreset.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el dia de visita para continuar.');
      return;
    }
    if (!visitDate) {
      setShowErrors(true);
      openAlert('Agrega la fecha de visita para continuar.');
      return;
    }
    if (!transport.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el tipo de transporte para continuar.');
      return;
    }

    const now = new Date();
    if (toStartOfDay(visitDate) < toStartOfDay(now)) {
      setShowErrors(true);
      openAlert('La fecha de visita no puede ser anterior a la fecha actual.');
      return;
    }

    addVisit({
      firstName,
      lastName,
      motherLastName,
      visitDate,
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={colors.headerBg} />
      <ThemedView style={[styles.content, { backgroundColor: colors.pageBg }]}
      >
        <View style={[styles.header, { backgroundColor: colors.headerBg }]}
        >
          <View style={styles.headerRow}>
            <View style={styles.headerIcon}>
              <IconSymbol size={22} name="key.fill" color={colors.iconDark} />
            </View>
            <ThemedText style={styles.headerTitle}>CONTROL DE ACCESO</ThemedText>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol
                size={18}
                name="chevron.right"
                color="#111111"
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <ThemedText style={styles.sectionTitle}>REGISTRO DE VISITA</ThemedText>
          </View>

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(property) && styles.fieldError,
            ]}
            onPress={() => openSelect(PROPERTY_OPTIONS, setProperty)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{property || 'INMUEBLE'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(firstName) && styles.fieldError,
            ]}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="NOMBRE DE LA VISITA"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(lastName) && styles.fieldError,
            ]}
            value={lastName}
            onChangeText={setLastName}
            placeholder="APELLIDO PATERNO"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(motherLastName) && styles.fieldError,
            ]}
            value={motherLastName}
            onChangeText={setMotherLastName}
            placeholder="APELLIDO MATERNO"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(phone) && styles.fieldError,
            ]}
            value={phone}
            onChangeText={setPhone}
            placeholder="TELEFONO"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />

          <TextInput
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(companions) && styles.fieldError,
            ]}
            value={companions}
            onChangeText={setCompanions}
            placeholder="NUMERO DE ACOMPANANTES"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
          />

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
            ]}
            onPress={() => openSelect(DATE_PRESETS, applyDatePreset)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{datePreset || 'HOY'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <View
            style={[
              styles.inputField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              styles.disabledDateField,
              hasDateError(visitDate) && styles.fieldError,
            ]}
          >
            <ThemedText style={[styles.dateValue, styles.disabledDateText, !visitDate && styles.datePlaceholder]}>
              {formatDate(visitDate) || 'Selecciona la fecha'}
            </ThemedText>
          </View>

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(transport) && styles.fieldError,
            ]}
            onPress={() => openSelect(TRANSPORT_OPTIONS, setTransport)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{transport || 'TIPO DE TRANSPORTE'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

        </ScrollView>

        <View style={[styles.footerAction, { paddingBottom: insets.bottom + 12, backgroundColor: colors.pageBg }]}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.headerBg }]}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <ThemedText style={styles.submitText}>REGISTRAR</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <Modal visible={Boolean(activeOptions)} transparent animationType="fade">
        <View style={styles.optionOverlay}>
          <View style={[styles.optionCard, { backgroundColor: colors.pageBg }]}
          >
            {activeOptions?.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSelect(option.value)}
                style={styles.optionItem}
              >
                <ThemedText>{option.label}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={closeSelect} style={styles.optionCancel}>
              <ThemedText>Cancelar</ThemedText>
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
            <ThemedText type="defaultSemiBold" style={styles.alertTitle}>Atencion</ThemedText>
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
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  datePlaceholder: {
    color: '#9CA3AF',
  },
  disabledDateField: {
    opacity: 0.7,
  },
  disabledDateText: {
    color: '#6B7280',
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
    padding: 16,
    paddingBottom: 12,
  },
  footerAction: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
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
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: '#111111',
  },
  selectField: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  inputField: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 12,
  },
  fieldError: {
    borderColor: '#EF4444',
  },
  submitButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  optionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  optionCard: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  optionItem: {
    paddingVertical: 12,
  },
  optionCancel: {
    paddingVertical: 12,
    alignItems: 'center',
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

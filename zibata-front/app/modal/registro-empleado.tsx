import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AccessControlColors } from '@/constants/features/access-control';
import { useAccessControlStore } from '@/hooks/features/access-control-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
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

const POSITION_OPTIONS: SelectOption[] = [
  { label: 'SEGURIDAD', value: 'SEGURIDAD' },
  { label: 'MANTENIMIENTO', value: 'MANTENIMIENTO' },
  { label: 'LIMPIEZA', value: 'LIMPIEZA' },
  { label: 'JARDINERIA', value: 'JARDINERIA' },
];

const SCHEDULE_OPTIONS: SelectOption[] = [
  { label: 'MATUTINO', value: 'MATUTINO' },
  { label: 'VESPERTINO', value: 'VESPERTINO' },
  { label: 'NOCTURNO', value: 'NOCTURNO' },
];

export default function RegistroEmpleadoModal(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = AccessControlColors[isDark ? 'dark' : 'light'];
  const cardBorder = isDark ? '#374151' : '#E5E7EB';
  const { addEmployee } = useAccessControlStore();

  const [property, setProperty] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');
  
  // Estados para fechas como Date objects
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  
  // Estados para mostrar los pickers
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
  
  // Estado para la imagen
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
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

  const openAlert = (message: string): void => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const formatDate = useCallback((date: Date | null): string => {
    if (!date) return '';
    const day = date.getDate();
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }, []);

  const formatTime = useCallback((time: Date | null): string => {
    if (!time) return '';
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const period = time.getHours() >= 12 ? 'p.m.' : 'a.m.';
    const displayHours = time.getHours() % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  }, []);

  const handleStartDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date): void => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedDate) {
      setStartDate(selectedDate);
    }
  }, []);

  const handleEndDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date): void => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedDate) {
      setEndDate(selectedDate);
    }
  }, []);

  const handleStartTimeChange = useCallback((event: DateTimePickerEvent, selectedTime?: Date): void => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedTime) {
      setStartTime(selectedTime);
    }
  }, []);

  const handleEndTimeChange = useCallback((event: DateTimePickerEvent, selectedTime?: Date): void => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (event.type === 'set' && selectedTime) {
      setEndTime(selectedTime);
    }
  }, []);

  const pickImage = useCallback(async (): Promise<void> => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        openAlert('Se necesita permiso para acceder a la galería.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      openAlert('Error al seleccionar la imagen.');
    }
  }, []);

  const hasError = (value: string): boolean => showErrors && !value.trim();
  const hasDateError = (date: Date | null): boolean => showErrors && date === null;
  const isSameDay = (left: Date, right: Date): boolean => (
    left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate()
  );
  const toStartOfDay = (value: Date): Date => new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const combineDateTime = (date: Date, time: Date): Date => new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    0,
    0,
  );

  const handleSubmit = (): void => {
    if (!property.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el inmueble para continuar.');
      return;
    }
    if (!firstName.trim()) {
      setShowErrors(true);
      openAlert('Agrega el nombre del empleado para continuar.');
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
    if (!position.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el puesto para continuar.');
      return;
    }
    if (!schedule.trim()) {
      setShowErrors(true);
      openAlert('Selecciona el horario para continuar.');
      return;
    }
    if (!startDate) {
      setShowErrors(true);
      openAlert('Selecciona la fecha de inicio para continuar.');
      return;
    }
    if (!endDate) {
      setShowErrors(true);
      openAlert('Selecciona la fecha final para continuar.');
      return;
    }
    if (!startTime) {
      setShowErrors(true);
      openAlert('Selecciona la hora de inicio para continuar.');
      return;
    }
    if (!endTime) {
      setShowErrors(true);
      openAlert('Selecciona la hora final para continuar.');
      return;
    }

    const now = new Date();
    const todayStart = toStartOfDay(now);

    if (toStartOfDay(startDate) < todayStart) {
      setShowErrors(true);
      openAlert('La fecha de inicio no puede ser anterior a la fecha actual.');
      return;
    }

    const startDay = toStartOfDay(startDate);
    const endDay = toStartOfDay(endDate);

    if (endDay < startDay) {
      setShowErrors(true);
      openAlert('La fecha final no puede ser anterior a la fecha de inicio.');
      return;
    }

    if (isSameDay(startDate, endDate) && isSameDay(startDate, now) && combineDateTime(startDate, startTime) < now) {
      setShowErrors(true);
      openAlert('La hora de inicio no puede ser anterior a la hora actual.');
      return;
    }

    if (isSameDay(startDate, endDate) && isSameDay(endDate, now) && combineDateTime(endDate, endTime) < now) {
      setShowErrors(true);
      openAlert('La hora final no puede ser anterior a la hora actual.');
      return;
    }

    if (isSameDay(startDate, endDate) && combineDateTime(endDate, endTime) <= combineDateTime(startDate, startTime)) {
      setShowErrors(true);
      openAlert('La hora final debe ser posterior a la hora de inicio.');
      return;
    }

    addEmployee({
      firstName,
      lastName,
      motherLastName,
      position,
      startDate,
    });

    router.back();
  };

  const now = new Date();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={colors.headerBg} />
      <ThemedView style={[styles.content, { backgroundColor: colors.pageBg }]}>
        <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
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
              <IconSymbol size={18} name="chevron.right" color="#111111" style={styles.backIcon} />
            </TouchableOpacity>
            <ThemedText style={styles.sectionTitle}>REGISTRO DE EMPLEADO</ThemedText>
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
            placeholder="NOMBRE DEL EMPLEADO"
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

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(position) && styles.fieldError,
            ]}
            onPress={() => openSelect(POSITION_OPTIONS, setPosition)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{position || 'TIPO DE EMPLEADO'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectField,
              { backgroundColor: colors.cardBg, borderColor: cardBorder },
              hasError(schedule) && styles.fieldError,
            ]}
            onPress={() => openSelect(SCHEDULE_OPTIONS, setSchedule)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.selectText}>{schedule || 'CONFIGURABLE'}</ThemedText>
            <IconSymbol size={16} name="chevron.down" color={colors.iconDark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateField, hasDateError(startDate) && styles.fieldError]}
            onPress={() => setShowStartDatePicker(true)}
            activeOpacity={0.8}
          >
            <IconSymbol size={16} name="calendar" color="#6B7280" style={styles.dateIcon} />
            <View style={styles.dateContent}>
              <ThemedText style={styles.dateLabel}>FECHA</ThemedText>
              <View
                style={[
                  styles.dateInput,
                  { backgroundColor: colors.cardBg, borderColor: cardBorder },
                  hasDateError(startDate) && styles.fieldError,
                ]}
              >
                <ThemedText style={[styles.dateValue, !startDate && styles.datePlaceholder]}>
                  {formatDate(startDate) || '30 dic 2025'}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateField, hasDateError(endDate) && styles.fieldError]}
            onPress={() => setShowEndDatePicker(true)}
            activeOpacity={0.8}
          >
            <IconSymbol size={16} name="calendar" color="#6B7280" style={styles.dateIcon} />
            <View style={styles.dateContent}>
              <ThemedText style={styles.dateLabel}>HASTA FECHA</ThemedText>
              <View
                style={[
                  styles.dateInput,
                  { backgroundColor: colors.cardBg, borderColor: cardBorder },
                  hasDateError(endDate) && styles.fieldError,
                ]}
              >
                <ThemedText style={[styles.dateValue, !endDate && styles.datePlaceholder]}>
                  {formatDate(endDate) || '30 dic 2025'}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.timeRow}>
            <TouchableOpacity
              style={[styles.timeField, hasDateError(startTime) && styles.fieldError]}
              onPress={() => setShowStartTimePicker(true)}
              activeOpacity={0.8}
            >
              <IconSymbol size={16} name="clock" color="#6B7280" style={styles.timeIcon} />
              <View
                style={[
                  styles.timeInput,
                  { backgroundColor: colors.cardBg, borderColor: cardBorder },
                  hasDateError(startTime) && styles.fieldError,
                ]}
              >
                <ThemedText style={[styles.timeValue, !startTime && styles.timePlaceholder]}>
                  {formatTime(startTime) || 'DESDE HORA'}
                </ThemedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeField, hasDateError(endTime) && styles.fieldError]}
              onPress={() => setShowEndTimePicker(true)}
              activeOpacity={0.8}
            >
              <IconSymbol size={16} name="clock" color="#6B7280" style={styles.timeIcon} />
              <View
                style={[
                  styles.timeInput,
                  { backgroundColor: colors.cardBg, borderColor: cardBorder },
                  hasDateError(endTime) && styles.fieldError,
                ]}
              >
                <ThemedText style={[styles.timeValue, !endTime && styles.timePlaceholder]}>
                  {formatTime(endTime) || 'HASTA HORA'}
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8} onPress={pickImage}>
            <View style={styles.cameraIcon}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.cameraImage} />
              ) : (
                <IconSymbol size={24} name="camera.fill" color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.headerBg }]}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <ThemedText style={styles.submitText}>REGISTRAR</ThemedText>
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

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleStartDateChange}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          minimumDate={startDate || new Date()}
          onChange={handleEndDateChange}
        />
      )}

      {showStartTimePicker && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="time"
          display="default"
          minimumDate={startDate && isSameDay(startDate, now) ? now : undefined}
          onChange={handleStartTimeChange}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="time"
          display="default"
          minimumDate={
            startDate && endDate && isSameDay(startDate, endDate) && startTime
              ? combineDateTime(endDate, startTime)
              : undefined
          }
          onChange={handleEndTimeChange}
        />
      )}
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
  timeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  timeField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeIcon: {
    marginLeft: 4,
  },
  timeInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dateIcon: {
    marginLeft: 4,
  },
  dateContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  dateInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  datePlaceholder: {
    color: '#9CA3AF',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  timePlaceholder: {
    color: '#9CA3AF',
  },
  cameraButton: {
    alignSelf: 'center',
    marginBottom: 16,
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

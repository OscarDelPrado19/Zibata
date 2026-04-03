import { CheckmarkButton } from '@/components/features/incidents/checkmark-button';
import { IncidentHeader } from '@/components/features/incidents/incident-header';
import { LocationPicker } from '@/components/features/incidents/location-picker';
import { LocationPreview } from '@/components/features/incidents/location-preview';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { INCIDENT_TYPES, IncidentsColors } from '@/constants/features/incidents';
import { useIncidentsStore } from '@/hooks/features/incidents-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Coordinates } from '@/types';
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type MediaItem = {
  type: 'image' | 'video';
  uri: string;
};

type SelectOption = {
  label: string;
  value: string;
};


const CATEGORY_OPTIONS = ['EXTERNO', 'INTERNO'] as const;
const REASON_OPTIONS = [INCIDENT_TYPES.MAINTENANCE, INCIDENT_TYPES.POWER_FAILURE, INCIDENT_TYPES.OTHER] as const;

function VideoPreviewItem({ uri }: { uri: string }): React.ReactElement {
  return (
    <View style={styles.videoPreviewContainer}>
      <Video
        source={{ uri }}
        rate={1.0}
        volume={0}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        shouldPlay={false}
        style={styles.videoPreviewImage}
      />
      <View style={styles.playOverlay}>
        <View style={styles.playButtonContainer}>
          <IconSymbol name="play.fill" size={24} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
}

export default function CrearIncidenciaModal(): React.ReactElement {
  const router = useRouter();
  const { addIncident } = useIncidentsStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = IncidentsColors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();

  const [category, setCategory] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [activeOptions, setActiveOptions] = useState<SelectOption[] | null>(null);
  const [activeSetter, setActiveSetter] = useState<((value: string) => void) | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
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

  const handlePickImage = async (): Promise<void> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets?.length) {
        setImages((prev) => [
          ...prev,
          ...result.assets.map((asset) => asset.uri),
        ]);
      }
    } catch (error) {
      console.warn('Error al seleccionar imágenes:', error);
      openAlert('No se pudo seleccionar imágenes. Intenta de nuevo.');
    }
  };

  const handlePickVideo = async (): Promise<void> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.[0]) {
        setVideos((prev) => [...prev, result.assets[0].uri]);
      }
    } catch (error) {
      console.warn('Error al seleccionar video:', error);
      openAlert('No se pudo seleccionar video. Intenta de nuevo.');
    }
  };

  const handleLocationSelect = (newCoordinates: Coordinates): void => {
    setCoordinates(newCoordinates);
  };

  const handleSubmit = (): void => {
    if (!category) {
      openAlert('Selecciona una categoría para continuar.');
      return;
    }

    if (!reason) {
      openAlert('Selecciona un motivo para continuar.');
      return;
    }

    if (!description.trim()) {
      openAlert('Agrega una descripción para continuar.');
      return;
    }

    if (!coordinates) {
      openAlert('Selecciona una ubicación en el mapa para continuar.');
      return;
    }

    addIncident({
      category,
      reason,
      description,
      coordinates,
      images,
      videos,
      reporter: 'Residente',
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={colors.headerBg} />
      <ThemedView style={{ flex: 1 }}>
        <IncidentHeader backgroundColor={colors.headerBg} iconColor={colors.text} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="defaultSemiBold" style={styles.label}>Categoría</ThemedText>
        <TouchableOpacity
          style={[styles.select, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          onPress={() => openSelect(CATEGORY_OPTIONS.map((item) => ({ label: item, value: item })), setCategory)}
          activeOpacity={0.8}
        >
          <ThemedText>{category || 'Seleccione categoría'}</ThemedText>
          <IconSymbol size={16} name="chevron.down" color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>

        <ThemedText type="defaultSemiBold" style={styles.label}>Motivo</ThemedText>
        <TouchableOpacity
          style={[styles.select, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          onPress={() => openSelect(REASON_OPTIONS.map((item) => ({ label: item, value: item })), setReason)}
          activeOpacity={0.8}
        >
          <ThemedText>{reason || 'Seleccione motivo'}</ThemedText>
          <IconSymbol size={16} name="chevron.down" color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>

        <ThemedText type="defaultSemiBold" style={styles.label}>Ubicación</ThemedText>
        <TouchableOpacity
          onPress={() => setShowLocationPicker(true)}
          style={[styles.locationButton, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <View style={styles.locationContent}>
            <IconSymbol name="location.fill" size={20} color="#3B82F6" />
            <View style={styles.locationText}>
              <ThemedText type="defaultSemiBold">
                {coordinates ? '✓ Ubicación seleccionada' : 'Seleccionar ubicación en mapa'}
              </ThemedText>
              <ThemedText type="default" style={styles.locationSubtext}>
                {coordinates ? 'Toca para cambiar' : 'Abre el mapa para elegir'}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>

        {coordinates && <LocationPreview coordinates={coordinates} />}

        <View style={styles.mediaRow}>
          <TouchableOpacity onPress={handlePickImage} style={[styles.mediaButton, { backgroundColor: colors.fabBg }]}>
            <IconSymbol name="camera.fill" size={24} color={colors.fabText} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickVideo} style={[styles.mediaButton, { backgroundColor: colors.fabBg }]}>
            <IconSymbol name="video.fill" size={24} color={colors.fabText} />
          </TouchableOpacity>
        </View>

        {(images.length > 0 || videos.length > 0) && (
          <View style={styles.previewContainer}>
            <FlatList<MediaItem>
              data={[
                ...images.map((uri) => ({ type: 'image' as const, uri })),
                ...videos.map((uri) => ({ type: 'video' as const, uri })),
              ]}
              horizontal
              keyExtractor={(item) => item.uri}
              renderItem={({ item }) => (
                <View style={styles.previewItem}>
                  {item.type === 'image' ? (
                    <Image source={{ uri: item.uri }} style={styles.previewImage} />
                  ) : (
                    <VideoPreviewItem uri={item.uri} />
                  )}
                </View>
              )}
            />
          </View>
        )}

        <ThemedText type="defaultSemiBold" style={styles.label}>Descripción</ThemedText>
        <View style={styles.descriptionWrapper}>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
            multiline
            numberOfLines={10}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe lo ocurrido (máx. 500 caracteres)"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            maxLength={500}
          />
          <ThemedText type="default" style={styles.charCounter}>{description.length} / 500</ThemedText>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <CheckmarkButton
        onPress={handleSubmit}
        backgroundColor={colors.fabBg}
        iconColor={colors.fabText}
        iconSize={32}
        style={[styles.submitFab, { bottom: insets.bottom + 20 }]}
      />

      <Modal visible={Boolean(activeOptions)} transparent animationType="fade">
        <View style={styles.optionOverlay}>
          <View style={[styles.optionCard, { backgroundColor: colors.cardBg }]}>
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
          <View style={[styles.alertCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          >
            <View style={styles.alertIconWrapper}>
              <IconSymbol name="exclamationmark.triangle.fill" size={28} color="#F59E0B" />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.alertTitle}>Atención</ThemedText>
            <ThemedText style={styles.alertMessage}>{alertMessage}</ThemedText>
            <TouchableOpacity
              onPress={() => setShowAlert(false)}
              style={[styles.alertButton, { backgroundColor: colors.fabBg }]}
              activeOpacity={0.9}
            >
              <ThemedText style={[styles.alertButtonText, { color: colors.fabText }]}>Entendido</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <LocationPicker
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelect={handleLocationSelect}
        currentCoordinates={coordinates}
        isDark={isDark}
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
    padding: 16,
    paddingBottom: 120,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  locationButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    justifyContent: 'center',
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  locationCoords: {
    marginTop: 4,
    opacity: 0.7,
  },
  locationSubtext: {
    marginTop: 4,
    opacity: 0.7,
    fontSize: 12,
  },
  mapPlaceholder: {
    height: 220,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapHint: {
    opacity: 0.7,
  },
  coords: {
    marginTop: 8,
  },
  mediaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  mediaButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    elevation: 3,
  },
  previewContainer: {
    marginVertical: 8,
  },
  previewItem: {
    width: 120,
    height: 80,
    marginRight: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  videoPreviewContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  videoPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B5563',
    gap: 8,
  },
  playButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  videoLabel: {
    color: '#FFFFFF',
    fontSize: 12,  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    minHeight: 140,
  },
  descriptionWrapper: {
    position: 'relative',
  },
  charCounter: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'right',
    paddingRight: 8,
    marginTop: 4,
  },
  submitFab: {
    position: 'absolute',
    alignSelf: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.45)',
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
  },
});

import { IncidentHeader } from '@/components/features/incidents/incident-header';
import { LocationPicker } from '@/components/features/incidents/location-picker';
import { LocationPreview } from '@/components/features/incidents/location-preview';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { INCIDENT_TYPES, IncidentsColors } from '@/constants/features/incidents';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type MediaItem = {
  type: 'image' | 'video';
  uri: string;
};

type IncidentPayload = {
  category: string;
  reason: string;
  description: string;
  coordinates: Coordinates | null;
  images: string[];
  videos: string[];
  date: string;
};

type NativeEventCoordinates = {
  nativeEvent: {
    locationX: number;
    locationY: number;
  };
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = IncidentsColors[isDark ? 'dark' : 'light'];

  const [category, setCategory] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);

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
      alert('No se pudo seleccionar imágenes');
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
      alert('No se pudo seleccionar video');
    }
  };

  // Código para marcar punto en mapa-placeholder
  const handleMapPress = (evt: NativeEventCoordinates): void => {
    const { locationX, locationY } = evt.nativeEvent;
    const latitude = 19.5 + locationY / 1000;
    const longitude = -99.2 + locationX / 1000;
    setCoordinates({ latitude, longitude });
  };

  const handleLocationSelect = (newCoordinates: Coordinates): void => {
    setCoordinates(newCoordinates);
  };

  const handleSubmit = (): void => {
    const payload: IncidentPayload = {
      category,
      reason,
      description,
      coordinates,
      images,
      videos,
      date: new Date().toISOString(),
    };
    console.log('Incidencia a enviar (guardada localmente):', payload);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ThemedView style={{ flex: 1 }}>
        <IncidentHeader backgroundColor={colors.headerBg} iconColor={colors.text} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="defaultSemiBold" style={styles.label}>Categoría</ThemedText>
        <TouchableOpacity
          style={[styles.select, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          onPress={() => setShowCategoryModal(true)}
        >
          <ThemedText>{category || 'Seleccione categoría'}</ThemedText>
        </TouchableOpacity>

        <ThemedText type="defaultSemiBold" style={styles.label}>Motivo</ThemedText>
        <TouchableOpacity
          style={[styles.select, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          onPress={() => setShowReasonModal(true)}
        >
          <ThemedText>{reason || 'Seleccione motivo'}</ThemedText>
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

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitFab, { backgroundColor: colors.fabBg }]}
        activeOpacity={0.9}
      >
        <IconSymbol name="checkmark.circle.fill" size={32} color={colors.fabText} />
      </TouchableOpacity>

      {/* Modales simples para seleccionar categoría/motivo */}
      <Modal visible={showCategoryModal} transparent animationType="slide">
        <View style={styles.optionModalOverlay}>
          <View style={[styles.optionModal, { backgroundColor: colors.cardBg }]}>
            <FlatList
              data={CATEGORY_OPTIONS}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { setCategory(item); setShowCategoryModal(false); }} style={styles.optionItem}>
                  <ThemedText>{item}</ThemedText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowCategoryModal(false)} style={styles.optionCancel}>
              <ThemedText>Cancelar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showReasonModal} transparent animationType="slide">
        <View style={styles.optionModalOverlay}>
          <View style={[styles.optionModal, { backgroundColor: colors.cardBg }]}>
            <FlatList
              data={REASON_OPTIONS}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { setReason(item); setShowReasonModal(false); }} style={styles.optionItem}>
                  <ThemedText>{item}</ThemedText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowReasonModal(false)} style={styles.optionCancel}>
              <ThemedText>Cancelar</ThemedText>
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
    bottom: 20,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  optionModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  optionModal: {
    maxHeight: 360,
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  optionItem: {
    paddingVertical: 12,
  },
  optionCancel: {
    paddingVertical: 12,
    alignItems: 'center',
  },
});

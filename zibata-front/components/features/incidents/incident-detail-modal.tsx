import { CheckmarkButton } from '@/components/features/incidents/checkmark-button';
import { IncidentHeader } from '@/components/features/incidents/incident-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { IncidentsColors } from '@/constants/features/incidents';
import type { Incident } from '@/types';
import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

interface IncidentDetailModalProps {
  visible: boolean;
  incident: Incident | null;
  onClose: () => void;
  isDark: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ABIERTO: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
  'EN PROGRESO': { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  CERRADO: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
};

const generateMapHTML = (coordinates: { latitude: number; longitude: number }): string => {
  const timestamp = Date.now();
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #map { width: 100%; height: 100%; background: #e5e3df; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    // Timestamp para evitar caché: ${timestamp}
    function initMap() {
      try {
        // Limpiar cualquier mapa existente
        if (window.mapInstance) {
          window.mapInstance.remove();
        }
        
        const mapDiv = document.getElementById('map');
        if (!mapDiv) {
          console.error('Map container not found');
          return;
        }
        
        const lat = parseFloat('${coordinates.latitude}');
        const lng = parseFloat('${coordinates.longitude}');
        
        console.log('Initializing map with coords:', lat, lng);
        
        window.mapInstance = L.map('map', {
          zoomControl: false,
          attributionControl: false
        }).setView([lat, lng], 17);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(window.mapInstance);

        L.circleMarker([lat, lng], {
          radius: 12,
          fillColor: '#3B82F6',
          color: '#1E40AF',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(window.mapInstance);

        setTimeout(() => {
          if (window.mapInstance) {
            window.mapInstance.invalidateSize();
          }
        }, 200);
      } catch (error) {
        console.error('Map error:', error);
      }
    }

    // Ejecutar inmediatamente
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMap);
    } else {
      initMap();
    }
    
    window.addEventListener('load', initMap);
  </script>
</body>
</html>`;
};

export function IncidentDetailModal({
  visible,
  incident,
  onClose,
  isDark,
}: IncidentDetailModalProps): React.ReactElement {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewUri, setPreviewUri] = useState<string>('');
  const [previewType, setPreviewType] = useState<'image' | 'video'>('image');
  const colors = IncidentsColors[isDark ? 'dark' : 'light'];

  if (!incident) {
    return <></>;
  }

  const statusColors = STATUS_COLORS[incident.status || 'ABIERTO'] || STATUS_COLORS.ABIERTO;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openPreview = (uri: string, type: 'image' | 'video'): void => {
    setPreviewUri(uri);
    setPreviewType(type);
    setPreviewVisible(true);
  };

  const closePreview = (): void => {
    setPreviewVisible(false);
    setPreviewUri('');
  };

  const renderMediaItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }): React.ReactElement => {
    const isVideo = incident.videos?.includes(item) ?? false;

    return (
      <TouchableOpacity
        style={styles.mediaItem}
        activeOpacity={0.85}
        onPress={() => openPreview(item, isVideo ? 'video' : 'image')}
      >
        {isVideo ? (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: item }}
              rate={1.0}
              volume={0}
              isMuted={true}
              resizeMode={ResizeMode.COVER}
              shouldPlay={false}
              style={styles.mediaImage}
            />
            <View style={styles.videoPlayIcon}>
              <IconSymbol name="play.fill" size={32} color="#FFFFFF" />
            </View>
          </View>
        ) : (
          <Image source={{ uri: item }} style={styles.mediaImage} resizeMode="cover" />
        )}
      </TouchableOpacity>
    );
  };

  const renderTimelineItem = ({
    item,
    index,
  }: {
    item: { id: string; date: string; description: string };
    index: number;
  }): React.ReactElement => {
    const isLast = index === (incident.timeline?.length ?? 0) - 1;
    const statusColor = statusColors.border;

    return (
      <View style={styles.timelineItem}>
        <View style={styles.timelineDotContainer}>
          <View style={[styles.timelineDot, { backgroundColor: statusColor }]} />
          {!isLast && <View style={[styles.timelineLine, { backgroundColor: statusColor }]} />}
        </View>
        <View style={styles.timelineContent}>
          <View style={styles.timelineEventBox}>
            <View style={styles.timelineEventIcon}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={statusColor} />
            </View>
            <View style={styles.timelineEventContent}>
              <ThemedText type="defaultSemiBold" style={styles.timelineDescription}>
                {item.description}
              </ThemedText>
              <ThemedText style={styles.timelineDate}>
                {formatDate(item.date)}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const allMedia = [
    ...(incident.images ?? []),
    ...(incident.videos ?? []),
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: isDark ? '#11182700' : '#ffffff00' }]}
        edges={['top']}
      >
        <ThemedView style={{ flex: 1 }}>
          <IncidentHeader
            backgroundColor={colors.headerBg}
            iconColor={colors.text}
          />

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Info Card */}
            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <ThemedText type="default" style={styles.infoLabel}>
                    FOLIO
                  </ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.infoValue}>
                    {incident.code}
                  </ThemedText>
                </View>
                <View style={styles.infoColumn}>
                  <ThemedText type="default" style={styles.infoLabel}>
                    CATEGORÍA
                  </ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.infoValue}>
                    {incident.category}
                  </ThemedText>
                </View>
              </View>

              {incident.status && (
                <View style={styles.statusContainer}>
                  <ThemedText type="default" style={styles.infoLabel}>
                    ESTATUS
                  </ThemedText>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: statusColors.bg,
                        borderColor: statusColors.border,
                      },
                    ]}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={[styles.statusText, { color: statusColors.text }]}
                    >
                      {incident.status}
                    </ThemedText>
                  </View>
                </View>
              )}
            </View>

            {/* Reason Section */}
            {incident.reason && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <IconSymbol name="exclamationmark.circle.fill" size={20} color="#EF4444" />
                  <ThemedText type="subtitle" style={styles.sectionTitle}>
                    {incident.reason}
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Description Section */}
            {incident.description && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
                  DESCRIPCIÓN
                </ThemedText>
                <View
                  style={[
                    styles.descriptionBox,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    },
                  ]}
                >
                  <ThemedText type="default" style={styles.descriptionText}>
                    {incident.description}
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Reporter Section */}
            {incident.reporter && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
                  REPORTADO POR
                </ThemedText>
                <View
                  style={[
                    styles.reporterBox,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    },
                  ]}
                >
                  <IconSymbol name="person.circle.fill" size={24} color="#6B7280" />
                  <ThemedText type="default" style={styles.reporterText}>
                    {incident.reporter}
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Location Section */}
            {incident.coordinates && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
                  UBICACIÓN
                </ThemedText>
                <View style={styles.mapContainer}>
                  <WebView
                    key={`map-${incident.coordinates.latitude}-${incident.coordinates.longitude}`}
                    source={{ html: generateMapHTML(incident.coordinates) }}
                    style={styles.mapWebview}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    scalesPageToFit={false}
                  />
                </View>
                <ThemedText type="default" style={styles.coordsInfo}>
                  {incident.coordinates.latitude.toFixed(6)}, {incident.coordinates.longitude.toFixed(6)}
                </ThemedText>
              </View>
            )}

            {/* Media Section */}
            {allMedia.length > 0 && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
                  EVIDENCIA ({allMedia.length})
                </ThemedText>
                <FlatList
                  data={allMedia}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={renderMediaItem}
                  contentContainerStyle={styles.mediaList}
                />
              </View>
            )}

            {/* Timeline Section */}
            {incident.timeline && incident.timeline.length > 0 && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
                  HISTORIAL DE EVENTOS
                </ThemedText>
                <View
                  style={[
                    styles.timelineContainer,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    },
                  ]}
                >
                  <FlatList
                    data={incident.timeline}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTimelineItem}
                    scrollEnabled={false}
                  />
                </View>
              </View>
            )}

            <View style={{ height: 40 }} />
          </ScrollView>

          <ImageViewing
            images={previewUri ? [{ uri: previewUri }] : []}
            imageIndex={0}
            visible={previewVisible && previewType === 'image'}
            onRequestClose={closePreview}
          />

          <Modal visible={previewVisible && previewType === 'video'} transparent animationType="fade">
            <View style={styles.previewOverlay}>
              <View style={styles.previewHeader}>
                <TouchableOpacity onPress={closePreview} style={styles.previewCloseButton}>
                  <IconSymbol name="xmark" size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.previewContent}>
                <Video
                  source={{ uri: previewUri }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={previewVisible}
                  useNativeControls
                  style={styles.previewMedia}
                />
              </View>
            </View>
          </Modal>

          {/* Close Button */}
          <View style={styles.closeButtonContainer}>
            <CheckmarkButton
              onPress={onClose}
              backgroundColor={colors.fabBg}
              iconColor={colors.fabText}
            />
          </View>
        </ThemedView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  descriptionBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  descriptionText: {
    lineHeight: 22,
  },
  reporterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  reporterText: {
    flex: 1,
  },
  locationBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  mapContainer: {
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  mapWebview: {
    flex: 1,
  },
  mapPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    gap: 8,
  },
  coordsText: {
    fontSize: 12,
    opacity: 0.7,
  },
  coordsInfo: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  mediaList: {
    paddingVertical: 4,
  },
  mediaItem: {
    width: 160,
    height: 120,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  videoPlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  timelineDotContainer: {
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    zIndex: 2,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  timelineLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#E5E7EB',
    top: 16,
    bottom: -12,
    left: 7,
  },
  timelineContent: {
    flex: 1,
  },
  timelineEventBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  timelineEventIcon: {
    marginTop: 2,
  },
  timelineEventContent: {
    flex: 1,
  },
  timelineDate: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
  timelineDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  previewHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  previewCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  previewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewMedia: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
  },
});

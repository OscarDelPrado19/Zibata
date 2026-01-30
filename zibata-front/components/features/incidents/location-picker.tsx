/**
 * Componente para seleccionar ubicación en mapa interactivo con GPS inicial
 */

import { ThemedText } from '@/components/themed-text';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface LocationPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (coordinates: Coordinates) => void;
  currentCoordinates?: Coordinates | null;
  isDark: boolean;
}

const DEFAULT_COORDINATES: Coordinates = {
  latitude: 19.4326,
  longitude: -99.1332,
};

export const LocationPicker: React.FC<LocationPickerProps> = ({
  visible,
  onClose,
  onSelect,
  currentCoordinates,
  isDark,
}) => {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    currentCoordinates || null,
  );

  useEffect(() => {
    if (visible && !selectedLocation) {
      requestLocationPermission();
    } else if (visible && selectedLocation) {
      setLoading(false);
    }
  }, [visible]);

  const requestLocationPermission = async (): Promise<void> => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Se usará una ubicación predeterminada. Puedes mover el pin en el mapa.',
        );
        setSelectedLocation(DEFAULT_COORDINATES);
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coordinates: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation(coordinates);
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      setSelectedLocation(DEFAULT_COORDINATES);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (): void => {
    if (selectedLocation) {
      onSelect(selectedLocation);
      onClose();
    }
  };

  const generateMapHTML = (): string => {
    const mapCenter = selectedLocation || DEFAULT_COORDINATES;
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; }
    #map { width: 100%; height: 100%; background: #e5e3df; }
    .info {
      position: absolute;
      bottom: 15px;
      left: 15px;
      background: rgba(0,0,0,0.85);
      color: white;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 999;
      font-family: monospace;
      white-space: nowrap;
    }
    .hint {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(59, 130, 246, 0.95);
      color: white;
      padding: 10px 14px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 999;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="hint">📍 Toca o arrastra el pin</div>
  <div class="info" id="info">
    Lat: ${mapCenter.latitude.toFixed(6)}<br>
    Lon: ${mapCenter.longitude.toFixed(6)}
  </div>
  <script>
    let map = null;
    let marker = null;
    let selectedLat = ${mapCenter.latitude};
    let selectedLng = ${mapCenter.longitude};

    function initMap() {
      if (map) return;
      
      map = L.map('map', { 
        attributionControl: true,
        zoomControl: true 
      }).setView([selectedLat, selectedLng], 16);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
        minZoom: 1
      }).addTo(map);

      marker = L.circleMarker([selectedLat, selectedLng], {
        radius: 12,
        fillColor: '#3B82F6',
        color: '#1D4ED8',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8,
        draggable: true
      }).addTo(map);

      marker.on('drag', function() {
        const pos = marker.getLatLng();
        selectedLat = pos.lat;
        selectedLng = pos.lng;
        updateInfo();
      });

      map.on('click', function(e) {
        selectedLat = e.latlng.lat;
        selectedLng = e.latlng.lng;
        marker.setLatLng([selectedLat, selectedLng]);
        map.setView([selectedLat, selectedLng], 16);
        updateInfo();
      });

      setTimeout(updateInfo, 100);
    }

    function updateInfo() {
      try {
        const infoDiv = document.getElementById('info');
        if (infoDiv) {
          infoDiv.innerHTML = 
            'Lat: ' + selectedLat.toFixed(6) + '<br>' +
            'Lon: ' + selectedLng.toFixed(6);
        }
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ latitude: selectedLat, longitude: selectedLng })
          );
        }
      } catch(e) {
        console.log('Error:', e);
      }
    }

    // Iniciar cuando el documento esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMap);
    } else {
      setTimeout(initMap, 100);
    }
    
    // Asegurar que se inicia en cualquier caso
    window.addEventListener('load', initMap);
  </script>
</body>
</html>`;
  };

  const handleMapMessage = (event: { nativeEvent: { data: string } }): void => {
    try {
      const coordinates = JSON.parse(event.nativeEvent.data);
      setSelectedLocation(coordinates);
    } catch (error) {
      console.error('Error parsing map message:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <ThemedText style={styles.cancelButton}>Cancelar</ThemedText>
          </TouchableOpacity>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Seleccionar ubicación
          </ThemedText>
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!selectedLocation || loading}
          >
            <ThemedText
              style={[
                styles.confirmButton,
                (!selectedLocation || loading) && styles.confirmButtonDisabled,
              ]}
            >
              Confirmar
            </ThemedText>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <ThemedText style={styles.loadingText}>
              Obteniendo ubicación GPS...
            </ThemedText>
            <ThemedText style={styles.loadingSubtext}>
              Esto puede tardar unos segundos
            </ThemedText>
          </View>
        ) : (
          <View style={styles.mapContainer}>
            <WebView
              ref={webViewRef}
              source={{ html: generateMapHTML() }}
              onMessage={handleMapMessage}
              style={styles.webview}
              originWhitelist={['*']}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 16,
  },
  cancelButton: {
    fontSize: 14,
    color: '#EF4444',
  },
  confirmButton: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  confirmButtonDisabled: {
    color: '#9CA3AF',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabLabelActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingSubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coordsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

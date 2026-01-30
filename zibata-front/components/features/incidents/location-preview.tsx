import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface LocationPreviewProps {
  coordinates: Coordinates;
}

const generatePreviewMapHTML = (coordinates: Coordinates): string => {
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
    function initMap() {
      try {
        const map = L.map('map').setView([${coordinates.latitude}, ${coordinates.longitude}], 17);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        L.circleMarker([${coordinates.latitude}, ${coordinates.longitude}], {
          radius: 12,
          fillColor: '#3B82F6',
          color: '#1E40AF',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map);

        // Recenter on map for better view
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      } catch (error) {
        console.error('Map error:', error);
      }
    }

    // Multiple initialization triggers
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

export function LocationPreview({ coordinates }: LocationPreviewProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.title}>Vista previa de ubicación</ThemedText>
      <View style={styles.mapContainer}>
        <WebView
          source={{ html: generatePreviewMapHTML(coordinates) }}
          style={styles.webview}
          scrollEnabled={false}
          zoomEnabled={false}
          scalesPageToFit={false}
        />
      </View>
      <ThemedText type="default" style={styles.coordinates}>
        {`Latitud: ${coordinates.latitude.toFixed(6)}\nLongitud: ${coordinates.longitude.toFixed(6)}`}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    padding: 8,
    paddingBottom: 4,
    fontSize: 14,
  },
  mapContainer: {
    height: 180,
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  webview: {
    flex: 1,
  },
  coordinates: {
    padding: 8,
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
});

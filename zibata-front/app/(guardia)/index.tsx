import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const H = "#133a67";
const FILTROS = ["ROL", "VISITANTE", "RESIDENTE", "INMUEBLE"];

export default function GuardiaHome(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [buscar, setBuscar] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("ROL");
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleQRPress = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    setScanned(false);
    setScannerVisible(true);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setScannerVisible(false);
    setBuscar(data);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="light" backgroundColor={H} translucent={false} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="shield-checkmark" size={34} color={H} />
        </View>
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
      </View>

      {/* ── BODY ── */}
      <View style={styles.body}>
        {/* BUSCADOR + QR */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="BUSCAR"
              placeholderTextColor="#9CA3AF"
              value={buscar}
              onChangeText={setBuscar}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleQRPress}>
            <Ionicons name="qr-code" size={30} color={H} />
          </TouchableOpacity>
        </View>

        {/* FILTROS */}
        <View style={styles.filtrosBar}>
          {FILTROS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFiltroActivo(f)}
              activeOpacity={0.8}
              style={styles.filtroBtn}
            >
              <Text
                style={[
                  styles.filtroText,
                  filtroActivo === f && styles.filtroTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EMPTY STATE */}
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 80 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyState}>
            <Ionicons name="shield-checkmark" size={80} color={H} />
          </View>
        </ScrollView>
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 68 }]}
        activeOpacity={0.85}
        onPress={() => router.push("/(guardia)/control-acceso")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* ── MODAL SCANNER QR ── */}
      <Modal visible={scannerVisible} animationType="slide">
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />

          {/* overlay con marco */}
          <View style={styles.overlay}>
            <View style={styles.overlayTop} />
            <View style={styles.overlayMiddle}>
              <View style={styles.overlaySide} />
              <View style={styles.scanFrame}>
                {/* esquinas del marco */}
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
              </View>
              <View style={styles.overlaySide} />
            </View>
            <View style={styles.overlayBottom}>
              <Text style={styles.scanText}>Apunta al código QR</Text>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setScannerVisible(false)}
              >
                <Text style={styles.cancelText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const FRAME = 240;
const CORNER = 24;
const BORDER = 4;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: H,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 12,
    gap: 16,
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 24,
    paddingHorizontal: 34,
    paddingVertical: 11,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#111111",
  },
  filtrosBar: {
    backgroundColor: H,
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: 24,
    borderRadius: 6,
    marginBottom: 8,
  },
  filtroBtn: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
  },
  filtroText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    opacity: 0.75,
  },
  filtroTextActive: {
    opacity: 1,
    textDecorationLine: "underline",
  },
  scroll: { flexGrow: 1 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E2E2E2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  fabText: {
    fontSize: 34,
    fontWeight: "200",
    color: "#444",
    lineHeight: 38,
  },

  /* SCANNER */
  scannerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  overlayMiddle: {
    height: FRAME,
    flexDirection: "row",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  scanFrame: {
    width: FRAME,
    height: FRAME,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  scanText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  cancelBtn: {
    backgroundColor: H,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  cancelText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },

  /* esquinas del marco */
  corner: {
    position: "absolute",
    width: CORNER,
    height: CORNER,
    borderColor: "#FFFFFF",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: BORDER,
    borderLeftWidth: BORDER,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: BORDER,
    borderRightWidth: BORDER,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: BORDER,
    borderLeftWidth: BORDER,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: BORDER,
    borderRightWidth: BORDER,
  },
});

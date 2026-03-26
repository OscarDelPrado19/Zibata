import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
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

const H = "#1E4D6B";
const FILTROS = ["ROL", "VISITANTE", "RESIDENTE", "INMUEBLE"];

export default function GuardiaHome(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [buscar, setBuscar] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("ROL");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor={H} translucent={false} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <IconSymbol size={34} name="person.crop.circle.fill" color={H} />
        </View>
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
      </View>

      {/* ── BODY ── */}
      <View style={styles.body}>
        {/* BUSCADOR + QR */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <IconSymbol size={18} name="magnifyingglass" color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="BUSCAR"
              placeholderTextColor="#9CA3AF"
              value={buscar}
              onChangeText={setBuscar}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <IconSymbol size={30} name="qrcode" color={H} />
          </TouchableOpacity>
        </View>

        {/* FILTROS — barra azul oscuro */}
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

        {/* EMPTY STATE — ícono gorra centrado */}
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 80 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyState}>
            <IconSymbol size={80} name="person.crop.circle.fill" color={H} />
          </View>
        </ScrollView>
      </View>

      {/* FAB + gris claro como en la foto */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 68 }]}
        activeOpacity={0.85}
        onPress={() => router.push("/(guardia)/registro-visita")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: H,
  },
  header: {
    backgroundColor: H,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 10,
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
    paddingHorizontal: 14,
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
    paddingHorizontal: 14,
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
    marginHorizontal: 14,
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
  scroll: {
    flexGrow: 1,
  },
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
});

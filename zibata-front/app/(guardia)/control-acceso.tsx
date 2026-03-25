import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ControlAcceso() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("ROL");

  const filtros = ["ROL", "VISITANTE", "RESIDENTE", "INMUEBLE"];

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="shield-checkmark" size={32} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>CONTROL DE ACCESO</Text>

        {/* BUSCADOR */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              placeholder="BUSCAR"
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity style={styles.qrBtn}>
            <Ionicons name="qr-code" size={24} color="#1a4a6b" />
          </TouchableOpacity>
        </View>

        {/* FILTROS */}
        <View style={styles.filtros}>
          {filtros.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filtroBtn, filtro === f && styles.filtroBtnActive]}
              onPress={() => setFiltro(f)}
            >
              <Text
                style={[
                  styles.filtroText,
                  filtro === f && styles.filtroTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ESTADO VACÍO */}
        <View style={styles.emptyState}>
          <Ionicons name="shield-checkmark" size={64} color="#1a4a6b" />
          <Text style={styles.emptyText}>Busca un residente o visitante</Text>
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#1a4a6b",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  headerIcon: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 50,
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  container: { padding: 20, paddingBottom: 100 },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a4a6b",
    marginBottom: 16,
    letterSpacing: 1,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, color: "#333", fontSize: 14 },
  qrBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filtros: {
    flexDirection: "row",
    backgroundColor: "#1a4a6b",
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    gap: 2,
  },
  filtroBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  filtroBtnActive: { backgroundColor: "#fff" },
  filtroText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  filtroTextActive: { color: "#1a4a6b" },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    gap: 12,
  },
  emptyText: { color: "#999", fontSize: 14 },
  fab: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: "#1a4a6b",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});

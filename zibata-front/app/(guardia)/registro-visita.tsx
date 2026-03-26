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

export default function RegistroVisita() {
  const [donde, setDonde] = useState("");
  const [placas, setPlacas] = useState("");
  const [nombre, setNombre] = useState("");

  const handleRegistrar = () => {
    if (!donde || !nombre) {
      alert("Completa los campos obligatorios");
      return;
    }
    alert("Visita registrada correctamente");
    setDonde("");
    setPlacas("");
    setNombre("");
  };

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
        {/* TABS */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Ionicons name="walk" size={20} color="#1a4a6b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="cube-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>REGISTRO DE VISITA</Text>

        {/* CAMPOS */}
        <TextInput
          placeholder="*DONDE"
          placeholderTextColor="#999"
          style={styles.input}
          value={donde}
          onChangeText={setDonde}
        />
        <TextInput
          placeholder="PLACAS"
          placeholderTextColor="#999"
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
          autoCapitalize="characters"
        />
        <TextInput
          placeholder="NOMBRE DEL VISITANTE"
          placeholderTextColor="#999"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        {/* FOTOGRAFÍAS */}
        <Text style={styles.fotoLabel}>FOTOGRAFIAS DEL ACCESO</Text>
        <View style={styles.fotoRow}>
          <TouchableOpacity style={styles.fotoBtn}>
            <Ionicons name="card" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fotoBtn}>
            <Ionicons name="car" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* BOTÓN REGISTRAR */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegistrar}>
          <Text style={styles.registerText}>REGISTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
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
  container: { padding: 20, paddingBottom: 40 },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#1a4a6b",
    borderRadius: 30,
    alignSelf: "center",
    padding: 4,
    gap: 4,
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 25,
  },
  tabActive: {
    backgroundColor: "#fff",
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a4a6b",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 14,
    color: "#333",
  },
  fotoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginTop: 8,
    marginBottom: 12,
  },
  fotoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 30,
  },
  fotoBtn: {
    backgroundColor: "#1a4a6b",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  registerBtn: {
    backgroundColor: "#1a4a6b",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 2,
  },
});

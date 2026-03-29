import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H = "#133a67";

export default function RegistroVisita() {
  const [activeTab, setActiveTab] = useState<"person" | "package">("person");
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
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="light" backgroundColor={H} translucent={false} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="shield-checkmark" size={32} color="#fff" />
        </View>
        {/* título centrado */}
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
        {/* spacer para centrar el texto */}
        <View style={styles.headerSpacer} />
      </View>

      {/* TABS */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "person" && styles.tabActive]}
            onPress={() => setActiveTab("person")}
          >
            <Ionicons
              name="walk"
              size={22}
              color={activeTab === "person" ? H : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "package" && styles.tabActive]}
            onPress={() => setActiveTab("package")}
          >
            <Ionicons
              name="cube-outline"
              size={22}
              color={activeTab === "package" ? H : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* título centrado y azul */}
        <Text style={styles.pageTitle}>REGISTRO DE VISITA3</Text>

        {/* CAMPOS con más margen a los lados */}
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

        {/* FOTOGRAFÍAS más grande */}
        <Text style={styles.fotoLabel}>FOTOGRAFIAS DEL ACCESO</Text>
        <View style={styles.fotoRow}>
          <TouchableOpacity style={styles.fotoBtn}>
            <Ionicons name="card" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fotoBtn}>
            <Ionicons name="car" size={30} color="#fff" />
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
  safe: {
    flex: 1,
  },

  /* header con título centrado */
  header: {
    backgroundColor: H,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerIcon: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 50,
    padding: 8,
    width: 50,
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 50, // mismo ancho que el ícono para centrar el texto
  },

  /* tabs sobre fondo azul */
  tabsContainer: {
    backgroundColor: H,
    alignItems: "center",
    paddingBottom: 14,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: H,
    borderRadius: 30,
    alignSelf: "center",
    padding: 4,
    gap: 4,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  tab: {
    padding: 10,
    borderRadius: 25,
  },
  tabActive: {
    backgroundColor: "#fff",
  },

  /* body blanco */
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 24, // más separado de los lados
    paddingTop: 24,
    paddingBottom: 40,
  },

  /* título centrado y azul */
  pageTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: H, // azul
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },

  /* inputs más separados de los lados */
  input: {
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 14,
    color: "#333",
  },

  /* fotografías más grande y más separadas */
  fotoLabel: {
    fontSize: 15, // más grande
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 16,
  },
  fotoRow: {
    flexDirection: "row",
    gap: 40, // más separados
    marginBottom: 30,
    justifyContent: "center",
  },
  fotoBtn: {
    backgroundColor: H,
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
  },

  /* botón registrar */
  registerBtn: {
    backgroundColor: H,
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

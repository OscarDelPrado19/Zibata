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

const H = "#1E4D6B"; // color azul del header

export default function RegistroVisitaGuardia(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"person" | "package">("person");
  const [donde, setDonde] = useState("");
  const [placas, setPlacas] = useState("");
  const [nombre, setNombre] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor={H} />

      {/* ─── HEADER AZUL ─── */}
      <View style={styles.header}>
        {/* Círculo blanco grande con ícono de gorra */}
        <View style={styles.avatarCircle}>
          <IconSymbol size={38} name="person.crop.circle.fill" color={H} />
        </View>
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
      </View>

      {/* ─── TABS SOBRE FONDO AZUL ─── */}
      <View style={styles.tabsBg}>
        {/* Tab peatón — activo: círculo blanco */}
        <TouchableOpacity
          onPress={() => setActiveTab("person")}
          activeOpacity={0.8}
          style={[styles.tab, activeTab === "person" && styles.tabActive]}
        >
          <IconSymbol
            size={26}
            name="figure.walk"
            color={activeTab === "person" ? H : "#FFFFFF"}
          />
        </TouchableOpacity>

        {/* Tab paquete — inactivo: solo ícono blanco, sin fondo */}
        <TouchableOpacity
          onPress={() => setActiveTab("package")}
          activeOpacity={0.8}
          style={[styles.tab, activeTab === "package" && styles.tabActive]}
        >
          <IconSymbol
            size={26}
            name="shippingbox.fill"
            color={activeTab === "package" ? H : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      {/* ─── CUERPO BLANCO ─── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* flecha + título */}
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Text style={styles.backArrow}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>!!!REGISTRO DE VISITA</Text>
        </View>

        {/* ── CAMPOS — rectangulares, gris claro, sin bordes ── */}
        <TextInput
          style={styles.field}
          placeholder="*DONDE"
          placeholderTextColor="#9CA3AF"
          value={donde}
          onChangeText={setDonde}
        />
        <TextInput
          style={styles.field}
          placeholder="PLACAS"
          placeholderTextColor="#9CA3AF"
          value={placas}
          onChangeText={setPlacas}
          autoCapitalize="characters"
        />
        <TextInput
          style={styles.field}
          placeholder="NOMBRE DEL VISITANTE"
          placeholderTextColor="#9CA3AF"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        {/* ── FOTOGRAFIAS ── */}
        <Text style={styles.fotoLabel}>FOTOGRAFIAS DEL ACCESO</Text>
        <View style={styles.fotoRow}>
          <TouchableOpacity style={styles.fotoCircle} activeOpacity={0.85}>
            <IconSymbol size={28} name="creditcard.fill" color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fotoCircle} activeOpacity={0.85}>
            <IconSymbol size={28} name="car.fill" color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* línea separadora */}
        <View style={styles.separator} />

        {/* ── BOTÓN REGISTRAR — centrado, pill, ancho justo ── */}
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.registerBtn} activeOpacity={0.9}>
            <Text style={styles.registerText}>REGISTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: H,
  },

  /* HEADER */
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
    width: 64,
    height: 64,
    borderRadius: 32,
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

  /* TABS */
  tabsBg: {
    backgroundColor: H,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
    gap: 12,
  },
  tab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    // inactivo: sin fondo visible sobre el azul
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
  },

  /* BODY */
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  /* TÍTULO */
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    lineHeight: 22,
  },
  pageTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
    letterSpacing: 0.6,
  },

  /* CAMPOS: rectangulares, sin border radius notable */
  field: {
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 14,
    fontSize: 13,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 10,
    width: "100%",
  },

  /* FOTOGRAFIAS */
  fotoLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
    marginTop: 10,
    marginBottom: 14,
  },
  fotoRow: {
    flexDirection: "row",
    gap: 28,
    marginBottom: 24,
  },
  fotoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: H,
    alignItems: "center",
    justifyContent: "center",
  },

  /* SEPARADOR */
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },

  /* BOTÓN */
  btnWrapper: {
    alignItems: "center",
  },
  registerBtn: {
    backgroundColor: H,
    borderRadius: 32,
    paddingVertical: 15,
    paddingHorizontal: 52,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
});

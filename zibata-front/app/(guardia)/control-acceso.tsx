import { IconSymbol } from "@/components/ui/icon-symbol";
import { Ionicons } from "@expo/vector-icons";
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

export default function ControlAcceso(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"person" | "package">("person");
  const [donde, setDonde] = useState("");
  const [placas, setPlacas] = useState("");
  const [nombre, setNombre] = useState("");

  const handleRegistrar = () => {
    if (!donde.trim() || !nombre.trim()) return;
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor={H} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="shield" size={34} color={H} />
        </View>
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
      </View>

      {/* ── TABS ── */}
      <View style={styles.tabsBg}>
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
        <TouchableOpacity
          onPress={() => setActiveTab("package")}
          activeOpacity={0.8}
          style={[styles.tab, activeTab === "package" && styles.tabActive]}
        >
          <Ionicons
            name="cube"
            size={26}
            color={activeTab === "package" ? H : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      {/* ── BODY BLANCO ── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* back + título */}
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>REGISTRO DE VISITA</Text>
        </View>

        {/* campos */}
        <TextInput
          style={styles.field}
          placeholder="*DONDE"
          placeholderTextColor="#9CA3AF"
          value={donde}
          onChangeText={setDonde}
          autoCapitalize="characters"
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

        {/* fotografías */}
        <Text style={styles.fotoLabel}>FOTOGRAFIAS DEL ACCESO</Text>
        <View style={styles.fotoRow}>
          <TouchableOpacity style={styles.fotoCircle} activeOpacity={0.85}>
            <Ionicons name="card" size={32} color="#FFFFFF" />{" "}
          </TouchableOpacity>
          <TouchableOpacity style={styles.fotoCircle} activeOpacity={0.85}>
            <IconSymbol size={32} name="car.fill" color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* separador */}
        <View style={styles.separator} />

        {/* botón registrar */}
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegistrar}
            activeOpacity={0.9}
          >
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
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
  },
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
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
    justifyContent: "center",
  },
  fotoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: H,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },
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

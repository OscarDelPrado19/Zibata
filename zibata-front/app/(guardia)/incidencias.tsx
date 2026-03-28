import { IconSymbol } from "@/components/ui/icon-symbol";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
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

type Incidencia = {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  hora: string;
};

const TIPOS: string[] = [
  "ROBO",
  "VANDALISMO",
  "ACCIDENTE",
  "PELEA",
  "PERSONA SOSPECHOSA",
  "OTRO",
];

export default function IncidenciasGuardia(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showTipoSelect, setShowTipoSelect] = useState(false);

  const now = () => {
    const d = new Date();
    const fecha = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
    const hora = `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    return { fecha, hora };
  };

  const handleGuardar = () => {
    if (!tipo) {
      Alert.alert("Error", "Selecciona el tipo de incidencia");
      return;
    }
    if (!descripcion.trim()) {
      Alert.alert("Error", "Agrega una descripción");
      return;
    }
    const { fecha, hora } = now();
    setIncidencias((prev) => [
      {
        id: Date.now().toString(),
        tipo,
        descripcion,
        fecha,
        hora,
      },
      ...prev,
    ]);
    setTipo("");
    setDescripcion("");
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="light" backgroundColor={H} />

      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="shield-checkmark" size={34} color={H} />
        </View>
        <Text style={styles.headerTitle}>CASETA DE VIGILANCIA</Text>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        {/* título */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>INCIDENCIAS</Text>
        </View>

        {/* lista */}
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 80 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {incidencias.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                size={56}
                name="exclamationmark.triangle.fill"
                color="#D1D5DB"
              />
              <Text style={styles.emptyText}>Sin incidencias registradas</Text>
            </View>
          ) : (
            incidencias.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.tipoBadge}>
                    <Text style={styles.tipoText}>{item.tipo}</Text>
                  </View>
                  <Text style={styles.cardFecha}>
                    {item.fecha} {item.hora}
                  </Text>
                </View>
                <Text style={styles.cardDesc}>{item.descripcion}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.85}
      >
        <IconSymbol size={28} name="plus" color="#FFFFFF" />
      </TouchableOpacity>

      {/* MODAL NUEVA INCIDENCIA */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>NUEVA INCIDENCIA</Text>

            {/* selector tipo */}
            <TouchableOpacity
              style={styles.select}
              onPress={() => setShowTipoSelect(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.selectText, !tipo && { color: "#9CA3AF" }]}>
                {tipo || "TIPO DE INCIDENCIA"}
              </Text>
              <IconSymbol size={16} name="chevron.down" color="#6B7280" />
            </TouchableOpacity>

            {/* descripción */}
            <TextInput
              style={styles.textarea}
              placeholder="DESCRIPCIÓN DE LA INCIDENCIA"
              placeholderTextColor="#9CA3AF"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* botones */}
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowModal(false);
                  setTipo("");
                  setDescripcion("");
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleGuardar}
                activeOpacity={0.9}
              >
                <Text style={styles.saveText}>GUARDAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL SELECTOR TIPO */}
      <Modal visible={showTipoSelect} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>TIPO DE INCIDENCIA</Text>
            {TIPOS.map((t) => (
              <TouchableOpacity
                key={t}
                style={styles.optionItem}
                onPress={() => {
                  setTipo(t);
                  setShowTipoSelect(false);
                }}
              >
                <Text style={styles.optionText}>{t}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowTipoSelect(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.4,
    textAlign: "center", // CAMBIO 1
  },
  body: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  titleRow: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  pageTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: H,
    letterSpacing: 1,
  },
  scroll: {
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 80,
    gap: 12,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tipoBadge: {
    backgroundColor: "#E8F0F7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tipoText: {
    color: H,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  cardFecha: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: H,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: H,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  select: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111111",
  },
  textarea: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 14,
    fontSize: 13,
    color: "#111111",
    minHeight: 100,
  },
  modalBtns: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: H,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
  },
  saveText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  optionItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111111",
  },
});

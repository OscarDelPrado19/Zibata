import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GuardiaHome() {
  const router = useRouter();

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
        <Text style={styles.welcome}>Bienvenido, Guardia</Text>
        <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>

        {/* TARJETAS DE ACCESO RÁPIDO */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(guardia)/control-acceso")}
          >
            <Ionicons name="key" size={32} color="#1a4a6b" />
            <Text style={styles.cardTitle}>Control de Acceso</Text>
            <Text style={styles.cardSub}>Verificar residentes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(guardia)/registro-visita")}
          >
            <Ionicons name="person-add" size={32} color="#1a4a6b" />
            <Text style={styles.cardTitle}>Registrar Visita</Text>
            <Text style={styles.cardSub}>Nuevo ingreso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(guardia)/incidencias")}
          >
            <Ionicons name="warning" size={32} color="#c0392b" />
            <Text style={styles.cardTitle}>Incidencias</Text>
            <Text style={styles.cardSub}>Reportar evento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(guardia)/menu")}
          >
            <Ionicons name="menu" size={32} color="#1a4a6b" />
            <Text style={styles.cardTitle}>Menú</Text>
            <Text style={styles.cardSub}>Más opciones</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  container: {
    padding: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a4a6b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    width: "47%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  cardSub: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
  },
});

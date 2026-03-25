import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GuardiaMenu() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/login");
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

      <View style={styles.container}>
        <Text style={styles.pageTitle}>MENÚ</Text>

        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-circle-outline" size={22} color="#1a4a6b" />
            <Text style={styles.menuText}>Mi Perfil</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#1a4a6b" />
            <Text style={styles.menuText}>Notificaciones</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={22} color="#1a4a6b" />
            <Text style={styles.menuText}>Historial de Accesos</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={22} color="#1a4a6b" />
            <Text style={styles.menuText}>Configuración</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </View>
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
  container: { flex: 1, padding: 20 },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a4a6b",
    marginBottom: 20,
    letterSpacing: 1,
  },
  menuList: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#c0392b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1,
  },
});

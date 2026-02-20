import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// ─── Contact Actions ──────────────────────────────────────────────────────────

const contactItems = [
  {
    icon: <Ionicons name="call" size={32} color="#000" />,
    label: "LLAMANOS",
    underline: true,
    onPress: () => Linking.openURL("tel:+1234567890"),
  },
  {
    icon: <FontAwesome name="whatsapp" size={32} color="#25D366" />,
    label: "WHATSAPP",
    underline: false,
    onPress: () => Linking.openURL("https://wa.me/1234567890"),
  },
  {
    icon: <MaterialCommunityIcons name="email" size={32} color="#C9793B" />,
    label: "CORREO",
    underline: false,
    onPress: () => Linking.openURL("mailto:contacto@example.com"),
  },
  {
    icon: <FontAwesome name="facebook" size={32} color="#1877F2" />,
    label: "FACEBOOK",
    underline: false,
    onPress: () => Linking.openURL("https://facebook.com"),
  },
  {
    icon: <Feather name="tool" size={32} color="#888" />,
    label: "SOPORTE\nTÉCNICO",
    underline: true,
    onPress: () => {},
  },
  {
    icon: <MaterialCommunityIcons name="web" size={32} color="#3BBBCA" />,
    label: "SITIO WEB",
    underline: false,
    onPress: () => Linking.openURL("https://example.com"),
  },
];

// ─── Schedule ─────────────────────────────────────────────────────────────────

const schedule = [
  { day: "LUNES", hours: "09:00 - 18:00" },
  { day: "MARTES", hours: "09:00 - 18:00" },
  { day: "MIÉRCOLES", hours: "09:00 - 18:00" },
  { day: "JUEVES", hours: "09:00 - 18:00" },
  { day: "VIERNES", hours: "09:00 - 16:00" },
  { day: "SÁBADO", hours: "09:00 - 13:00" },
  { day: "DOMINGO", hours: "CERRADO" },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          style={styles.backIcon}
        />
        <Text style={styles.headerTitle}> </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── ¿Cómo te podemos ayudar? ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿CÓMO TE PODEMOS AYUDAR?</Text>
          <View style={styles.contactGrid}>
            {contactItems.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.contactItem}
                onPress={item.onPress}
              >
                {item.icon}
                <Text
                  style={[
                    styles.contactLabel,
                    item.underline && styles.contactLabelUnderline,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Horarios ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>HORARIOS DE ATENCIÓN</Text>
          <View style={styles.scheduleTable}>
            {schedule.map((row, idx) => (
              <View key={idx} style={styles.scheduleRow}>
                <Text style={styles.scheduleDay}>{row.day}</Text>
                <Text
                  style={[
                    styles.scheduleHours,
                    row.hours === "CERRADO" && styles.scheduleClosed,
                  ]}
                >
                  {row.hours}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  // Header
  header: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backIcon: {
    marginRight: 14,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
  },

  // Scroll
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
    color: "#000",
    marginBottom: 18,
  },

  // Contact grid (3 cols x 2 rows)
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 20,
  },
  contactItem: {
    width: "30%",
    alignItems: "center",
    gap: 6,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#222",
  },
  contactLabelUnderline: {
    textDecorationLine: "underline",
  },

  // Schedule
  scheduleTable: {
    gap: 10,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  scheduleDay: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 0.5,
  },
  scheduleHours: {
    fontSize: 13,
    fontWeight: "400",
    color: "#333",
  },
  scheduleClosed: {
    color: "#999",
  },
});

import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.22;
const MENU_RADIUS = width * 0.32;

// ─── Pagos Types & Data ───────────────────────────────────────────────────────

interface Payment {
  id: string;
  title: string;
  date: string;
  amount: number;
}

const PAID_PAYMENTS: Payment[] = [
  {
    id: "1",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/04/2022",
    amount: 1.0,
  },
  {
    id: "2",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/05/2022",
    amount: 1.0,
  },
  {
    id: "3",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/06/2022",
    amount: 1.0,
  },
  {
    id: "4",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/07/2022",
    amount: 1.0,
  },
  {
    id: "5",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/08/2022",
    amount: 1.0,
  },
  {
    id: "6",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/09/2022",
    amount: 1.0,
  },
  {
    id: "7",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/10/2022",
    amount: 1.0,
  },
  {
    id: "8",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/11/2022",
    amount: 1.0,
  },
];

const PENDING_PAYMENTS: Payment[] = [
  {
    id: "p1",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/11/2023",
    amount: 600.0,
  },
  {
    id: "p2",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/09/2025",
    amount: 1.0,
  },
  {
    id: "p3",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/10/2025",
    amount: 600.0,
  },
  {
    id: "p4",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/11/2025",
    amount: 600.0,
  },
  {
    id: "p5",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/12/2025",
    amount: 600.0,
  },
  {
    id: "p6",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/01/2026",
    amount: 600.0,
  },
  {
    id: "p7",
    title: "CUOTA MANTENIMIENTO ZIBATA VIVIENDA",
    date: "01/02/2026",
    amount: 600.0,
  },
];

// ─── Control de Pagos Screen ──────────────────────────────────────────────────

function ControlPagosScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState(0); // 0=pagados, 1=pendientes, 2=estado
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["p3"]));

  const togglePayment = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const totalSelected = PENDING_PAYMENTS.filter((p) =>
    selectedIds.has(p.id),
  ).reduce((sum, p) => sum + p.amount, 0);

  const TABS = [
    {
      label: "PAGADOS",
      icon: (active: boolean) => (
        <Ionicons
          name="walk-outline"
          size={22}
          color={active ? "#fff" : "#888"}
        />
      ),
    },
    {
      label: "PENDIENTES",
      icon: (active: boolean) => (
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={22}
          color={active ? "#fff" : "#888"}
        />
      ),
    },
    {
      label: "ESTADO CUENTA",
      icon: (active: boolean) => (
        <Feather
          name="credit-card"
          size={22}
          color={active ? "#fff" : "#888"}
        />
      ),
    },
  ];

  const renderPaidCard = ({ item }: { item: Payment }) => (
    <View style={pagosStyles.cardPaid}>
      <View style={pagosStyles.cardContent}>
        <Text style={pagosStyles.cardTitleBold}>{item.title}</Text>
        <Text style={pagosStyles.cardMetaDark}>
          <Text style={pagosStyles.metaLabel}>FECHA: </Text>
          {item.date}
          {"   "}
          <Text style={pagosStyles.metaLabel}>PAGO: </Text>
          {item.amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderPendingCard = ({ item }: { item: Payment }) => {
    const selected = selectedIds.has(item.id);
    return (
      <View
        style={[
          pagosStyles.cardBase,
          selected ? pagosStyles.cardSelected : pagosStyles.cardUnselected,
        ]}
      >
        <View style={pagosStyles.cardContent}>
          <Text
            style={
              selected ? pagosStyles.cardTitleBold : pagosStyles.cardTitleMuted
            }
          >
            {item.title}
          </Text>
          <Text
            style={
              selected ? pagosStyles.cardMetaDark : pagosStyles.cardMetaMuted
            }
          >
            <Text style={pagosStyles.metaLabel}>FECHA: </Text>
            {item.date}
            {"   "}
            <Text style={pagosStyles.metaLabel}>PAGO: </Text>
            {item.amount.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => togglePayment(item.id)}
          style={[
            pagosStyles.checkbox,
            selected ? pagosStyles.checkboxOn : pagosStyles.checkboxOff,
          ]}
        >
          {selected && <Ionicons name="checkmark" size={14} color="#fff" />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={pagosStyles.container}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={pagosStyles.header}>
        <TouchableOpacity onPress={onBack} style={pagosStyles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={pagosStyles.headerIconBox}>
          <Feather name="credit-card" size={18} color="#fff" />
        </View>
        <Text style={pagosStyles.headerTitle}>CONTROL DE PAGOS</Text>
      </View>

      {/* Tabs */}
      <View style={pagosStyles.tabRow}>
        {TABS.map((tab, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setActiveTab(idx)}
            style={[
              pagosStyles.tabCircle,
              activeTab === idx && pagosStyles.tabCircleActive,
            ]}
          >
            {tab.icon(activeTab === idx)}
          </TouchableOpacity>
        ))}
      </View>

      {/* Body */}
      <View style={pagosStyles.body}>
        <Text style={pagosStyles.sectionTitle}>{TABS[activeTab].label}</Text>

        <TouchableOpacity style={pagosStyles.propertySelector}>
          <Text style={pagosStyles.propertySelectorText}>
            DISCOVERY CENTER SN
          </Text>
          <Ionicons name="chevron-down" size={18} color="#000" />
        </TouchableOpacity>

        {/* Lists */}
        {activeTab === 0 && (
          <FlatList
            data={PAID_PAYMENTS}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={renderPaidCard}
          />
        )}

        {activeTab === 1 && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={PENDING_PAYMENTS}
              keyExtractor={(i) => i.id}
              contentContainerStyle={{ gap: 8, paddingBottom: 90 }}
              showsVerticalScrollIndicator={false}
              renderItem={renderPendingCard}
            />
            <View style={pagosStyles.fabContainer}>
              <TouchableOpacity style={pagosStyles.payButton}>
                <Text style={pagosStyles.payButtonText}>
                  PAGAR ${totalSelected.toFixed(0)}MXN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 2 && (
          <View style={pagosStyles.emptyState}>
            <Feather name="file-text" size={48} color="#CCC" />
            <Text style={pagosStyles.emptyText}>Estado de cuenta</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const pagosStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  headerIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  tabRow: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    paddingBottom: 14,
  },
  tabCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  tabCircleActive: {
    borderColor: "#fff",
    backgroundColor: "#222",
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  propertySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EBEBEB",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  propertySelectorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    letterSpacing: 0.5,
  },
  // Paid card
  cardPaid: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 12,
  },
  // Pending cards
  cardBase: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  cardSelected: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1.5,
  },
  cardUnselected: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E8E8E8",
  },
  cardContent: { flex: 1 },
  cardTitleBold: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  cardTitleMuted: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  cardMetaDark: { fontSize: 11, color: "#555" },
  cardMetaMuted: { fontSize: 11, color: "#BBB" },
  metaLabel: { fontWeight: "700" },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxOn: { backgroundColor: "#000" },
  checkboxOff: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#CCC",
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  payButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: { fontSize: 15, color: "#CCC", fontWeight: "500" },
});

// ─── Menu Items ───────────────────────────────────────────────────────────────

const menuItems = [
  {
    icon: <MaterialCommunityIcons name="bell-alert" size={30} color="white" />,
    label: "INCIDENCIA",
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={30}
        color="white"
      />
    ),
    label: "AMENIDADES",
  },
  { icon: <Feather name="key" size={30} color="white" />, label: "ACCESOS" },
  {
    icon: <Feather name="credit-card" size={30} color="white" />,
    label: "PAGOS",
  },
  {
    icon: (
      <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
    ),
    label: "CHAT",
  },
  {
    icon: <Ionicons name="notifications-outline" size={30} color="white" />,
    label: "AVISOS",
  },
];

// ─── Home Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  const handleMenuPress = (label: string) => {
    if (label === "PAGOS") {
      setCurrentScreen("PAGOS");
    }
    // otros módulos aquí después
  };

  if (currentScreen === "PAGOS") {
    return <ControlPagosScreen onBack={() => setCurrentScreen(null)} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* HEADER FULL WIDTH */}
      <Image
        source={require("@/assets/images/urban.png")}
        style={styles.headerImage}
        contentFit="cover"
      />

      <View style={styles.circleWrapper}>
        {menuItems.map((item, index) => {
          const angle = (index * 360) / menuItems.length;
          const rad = (angle * Math.PI) / 180;
          const x = MENU_RADIUS * Math.cos(rad);
          const y = MENU_RADIUS * Math.sin(rad);

          return (
            <View
              key={index}
              style={[
                styles.menuItem,
                { transform: [{ translateX: x }, { translateY: y }] },
              ]}
            >
              <TouchableOpacity
                style={styles.circle}
                onPress={() => handleMenuPress(item.label)}
              >
                {item.icon}
              </TouchableOpacity>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  circleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    position: "absolute",
    alignItems: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
});

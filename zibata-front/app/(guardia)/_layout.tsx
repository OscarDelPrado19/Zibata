import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GuardiaLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "#1a4a6b",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          elevation: 0,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 4,
          paddingTop: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
          letterSpacing: 0.3,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 8,
        },
      }}
    >
      {/* Pantalla principal del guardia */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <IconSymbol size={24} name="house.fill" color={color} />
            </View>
          ),
        }}
      />

      {/* Control de acceso */}
      <Tabs.Screen
        name="control-acceso"
        options={{
          title: "Acceso",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <IconSymbol size={24} name="key.fill" color={color} />
            </View>
          ),
        }}
      />

      {/* Registro de visitas */}
      <Tabs.Screen
        name="registro-visita"
        options={{
          title: "Visitas",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <IconSymbol
                size={24}
                name="person.badge.plus.fill"
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Incidencias */}
      <Tabs.Screen
        name="incidencias"
        options={{
          title: "Incidencias",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <IconSymbol
                size={24}
                name="exclamationmark.triangle.fill"
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Menú / Perfil */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menú",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <IconSymbol size={24} name="line.3.horizontal" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  iconFocused: {
    backgroundColor: "rgba(26, 74, 107, 0.1)",
  },
});

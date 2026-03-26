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
        tabBarActiveTintColor: "#1E4D6B",
        tabBarInactiveTintColor: "#1E4D6B",
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      }}
    >
      {/* 1. Casa */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <IconSymbol size={26} name="house.fill" color="#1E4D6B" />
            </View>
          ),
        }}
      />

      {/* 2. Persona */}
      <Tabs.Screen
        name="control-acceso"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <IconSymbol size={26} name="person.fill" color="#1E4D6B" />
            </View>
          ),
        }}
      />

      {/* 3. Menú hamburguesa */}
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <IconSymbol size={26} name="line.3.horizontal" color="#1E4D6B" />
            </View>
          ),
        }}
      />

      {/* Ocultar las demás pantallas del navbar */}
      <Tabs.Screen name="registro-visita" options={{ href: null }} />
      <Tabs.Screen name="incidencias" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  iconFocused: {
    backgroundColor: "rgba(30, 77, 107, 0.08)",
  },
});

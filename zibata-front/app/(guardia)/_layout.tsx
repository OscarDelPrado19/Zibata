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
        tabBarActiveTintColor: "#133a67",
        tabBarInactiveTintColor: "#133a67",
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, { bottom: Math.max(insets.bottom, 24) }],
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <IconSymbol size={26} name="house.fill" color="#133a67" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="control-acceso"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <IconSymbol size={26} name="person.fill" color="#133a67" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused && styles.iconFocused]}>
              <IconSymbol size={26} name="line.3.horizontal" color="#133a67" />
            </View>
          ),
        }}
      />

      <Tabs.Screen name="registro-visita" options={{ href: null }} />
      <Tabs.Screen name="incidencias" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 24,
    height: 68,
    borderRadius: 20,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    marginLeft: 40,
    marginRight: 40,
  },
  tabBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 68,
    paddingVertical: 0,
    marginVertical: 0,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 14,
    marginTop: 25,
  },
  iconFocused: {
    backgroundColor: "rgba(19, 58, 103, 0.10)",
    borderRadius: 14,
    overflow: "hidden",
  },
});

import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.22;
const MENU_RADIUS = width * 0.32;

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
  {
    icon: <Feather name="key" size={30} color="white" />,
    label: "ACCESOS",
  },
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

export default function HomeScreen() {
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
                {
                  transform: [{ translateX: x }, { translateY: y }],
                },
              ]}
            >
              <TouchableOpacity style={styles.circle}>
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

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function MenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.drawer}>
        <ScrollView contentContainerStyle={styles.menuContent}>
          <MenuItem icon="person-outline" label="PERFIL" type="ion" />
          <MenuItem icon="car-outline" label="VEHÍCULOS" type="ion" />
          <MenuItem
            icon="file-document-outline"
            label="AVISO PRIVACIDAD"
            type="material"
          />
          <MenuItem
            icon="file-document-multiple-outline"
            label="TÉRMINOS Y CONDICIONES"
            type="material"
          />
          <MenuItem
            icon="clipboard-text-outline"
            label="TRÁMITES"
            type="material"
          />
          <MenuItem icon="bookmark-outline" label="CONÓCENOS" type="material" />
          <MenuItem
            icon="information-outline"
            label="ACERCA DE"
            type="material"
            onPress={() => router.push('/(tabs)/acerca-de' as any)}
          />
          <MenuItem icon="log-out-outline" label="SALIR" type="ion" />

          {/* LOGO */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/urbanwhite.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>TODOS LOS DERECHOS RESERVADOS</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

type IonIconName = ComponentProps<typeof Ionicons>["name"];
type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type MenuItemProps =
  | {
      icon: IonIconName;
      label: string;
      type: "ion";
      onPress?: () => void;
    }
  | {
      icon: MaterialIconName;
      label: string;
      type: "material";
      onPress?: () => void;
    };

function MenuItem({ icon, label, type, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
      {type === "ion" ? (
        <Ionicons name={icon} size={24} color="white" />
      ) : (
        <MaterialCommunityIcons name={icon} size={24} color="white" />
      )}
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  drawer: {
    flex: 1,
    backgroundColor: "black",
  },

  menuContent: {
    paddingTop: 30,
    paddingHorizontal: 25,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  menuText: {
    color: "white",
    fontSize: 16,
    marginLeft: 20,
    letterSpacing: 1,
  },

  logoContainer: {
    marginTop: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },

  footerText: {
    color: "white",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
    fontSize: 12,
    letterSpacing: 1,
  },
});

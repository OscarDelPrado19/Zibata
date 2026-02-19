import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="white"
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>PERFIL</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={styles.name}>LUIS LUNA DTL</Text>
        </View>

        <View style={styles.inputBox}>
          <Feather name="phone" size={20} color="#666" />
          <Text style={styles.inputText}>1111111111</Text>
        </View>

        <View style={styles.inputBox}>
          <Feather name="mail" size={20} color="#666" />
          <Text style={styles.inputText}>jluna@desarrollo.com.mc</Text>
        </View>

        <View style={styles.centerInfo}>
          <Text style={styles.centerTitle}>DISCOVERY CENTER</Text>
          <Text style={styles.centerSub}>SN</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ACTUALIZAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ELIMINAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]}>
            <Text style={styles.buttonText}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    backgroundColor: "black",
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  headerIcon: {
    position: "absolute",
    left: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 15,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  inputText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#444",
  },

  centerInfo: {
    alignItems: "center",
    marginTop: 25,
  },

  centerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  centerSub: {
    fontSize: 16,
    marginTop: 4,
  },

  buttonContainer: {
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 30,
  },

  button: {
    backgroundColor: "black",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 14,
  },
});

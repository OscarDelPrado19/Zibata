import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Usuarios simulados con roles
const USUARIOS = [
  { usuario: "guardia1", password: "guardia123", rol: "guardia" },
  { usuario: "admin1", password: "admin123", rol: "admin" },
  { usuario: "residente1", password: "residente123", rol: "residente" },
];

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    if (!usuario || !password) {
      Alert.alert("Error", "Ingresa usuario y contraseña");
      return;
    }

    const user = USUARIOS.find(
      (u) => u.usuario === usuario && u.password === password,
    );

    if (!user) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
      return;
    }

    // Redirigir según el rol
    if (user.rol === "guardia") {
      router.replace("/(guardia)");
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* LOGO */}
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* CARD NEGRA */}
        <View style={styles.card}>
          {/* Usuario */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#fff" />
            <TextInput
              placeholder="USUARIO"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.line} />

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#fff" />
            <TextInput
              placeholder="CONTRASEÑA"
              placeholderTextColor="#ccc"
              secureTextEntry={secure}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>OLVIDÉ MI CONTRASEÑA</Text>
          </TouchableOpacity>

          {/* Botón aceptar */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryText}>ACEPTAR</Text>
          </TouchableOpacity>

          {/* Botón registro */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.secondaryText}>REGÍSTRATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#c6c3c3",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  logo: {
    width: 350,
    height: 320,
    marginTop: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    paddingVertical: 10,
  },
  line: {
    height: 1,
    backgroundColor: "#fff",
    opacity: 0.3,
  },
  forgot: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  primaryText: {
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 15,
  },
  secondaryText: {
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

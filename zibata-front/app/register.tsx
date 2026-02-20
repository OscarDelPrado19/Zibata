import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [telefono, setTelefono] = useState("");

  const [submitPressed, setSubmitPressed] = useState(false);

  const telefonoValido = /^\d{10}$/.test(telefono);

  const handleSubmit = () => {
    setSubmitPressed(true);

    if (nombre.trim() && paterno.trim() && materno.trim() && telefonoValido) {
      console.log("Formulario válido");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/zibata.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>REGISTRO</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.form}>
          <Input
            label="Nombre"
            placeholder="NOMBRE"
            value={nombre}
            onChangeText={setNombre}
            error={
              submitPressed && nombre.trim() === ""
                ? "Necesitas completar el campo Nombre"
                : undefined
            }
          />

          <Input
            label="Apellido Paterno"
            placeholder="APELLIDO PATERNO"
            value={paterno}
            onChangeText={setPaterno}
            error={
              submitPressed && paterno.trim() === ""
                ? "Necesitas completar el campo Apellido Paterno"
                : undefined
            }
          />

          <Input
            label="Apellido Materno"
            placeholder="APELLIDO MATERNO"
            value={materno}
            onChangeText={setMaterno}
            error={
              submitPressed && materno.trim() === ""
                ? "Necesitas completar el campo Apellido Materno"
                : undefined
            }
          />

          <Input
            label="Teléfono"
            placeholder="TELÉFONO"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            error={
              submitPressed && !telefonoValido
                ? "El teléfono debe tener 10 dígitos"
                : undefined
            }
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SIGUIENTE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error,
}) => {
  return (
    <View style={{ marginBottom: 25 }}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#777"
          style={[
            styles.input,
            error && { borderColor: "#E53935", borderWidth: 1 },
          ]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />

        {error && (
          <View style={styles.errorCircle}>
            <Text style={styles.errorX}>×</Text>
          </View>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#000",
    alignItems: "center",
    paddingVertical: 0,
  },
  headerImage: {
    width: 350,
    height: 200,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 15,
    paddingHorizontal: 15,
    paddingRight: 45,
    borderRadius: 4,
    fontSize: 14,
  },
  errorCircle: {
    position: "absolute",
    right: 12,
    top: "30%",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },
  errorX: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorText: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  KeyboardTypeOptions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [showPrivacy, setShowPrivacy] = useState(false);

  /* ---------------- STEP 1 ---------------- */
  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const telefonoValido = /^\d{10}$/.test(telefono);

  /* ---------------- STEP 2 ---------------- */

  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  /* ---------------- STEP 3 ---------------- */
  const [tipo, setTipo] = useState("PROPIETARIO");
  const [domicilio, setDomicilio] = useState("");
  const [edad, setEdad] = useState("");

  const [submitPressed, setSubmitPressed] = useState(false);

  /* ---------- VALIDACIONES ---------- */

  const step1Valido =
    nombre.trim() && paterno.trim() && materno.trim() && telefonoValido;

  const step2Valido =
    correo.trim() &&
    usuario.trim() &&
    password.length >= 3 &&
    password === repeatPassword;

  const step3Valido = tipo.trim() && domicilio.trim() && edad.trim();

  /* ---------- HANDLERS ---------- */

  const handleStep1 = () => {
    setSubmitPressed(true);
    if (step1Valido) {
      setShowPrivacy(true);
    }
  };

  const handleAcceptPrivacy = () => {
    setShowPrivacy(false);
    setSubmitPressed(false);
    setStep(2);
  };

  const handleStep2 = () => {
    setSubmitPressed(true);
    if (step2Valido) {
      setSubmitPressed(false);
      setStep(3);
    }
  };

  const handleSave = () => {
    setSubmitPressed(true);
    if (step3Valido) {
      console.log("REGISTRO COMPLETO");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Image
              source={require("../assets/images/zibata.png")}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.titleRow}>
            <TouchableOpacity
              onPress={() => (step === 1 ? router.back() : setStep(step - 1))}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>REGISTRO</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.form}>
            {/* ---------------- STEP 1 ---------------- */}
            {step === 1 && (
              <>
                <Input
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

                <MainButton text="SIGUIENTE" onPress={handleStep1} />
              </>
            )}

            {/* ---------------- STEP 2 ---------------- */}
            {step === 2 && (
              <>
                <Input
                  placeholder="CORREO ELECTRÓNICO"
                  value={correo}
                  onChangeText={setCorreo}
                  error={
                    submitPressed && correo.trim() === ""
                      ? "Necesitas completar el correo"
                      : undefined
                  }
                />

                <Input
                  placeholder="USUARIO"
                  value={usuario}
                  onChangeText={setUsuario}
                  error={
                    submitPressed && usuario.trim() === ""
                      ? "Necesitas completar el usuario"
                      : undefined
                  }
                />

                <Input
                  placeholder="CONTRASEÑA"
                  value={password}
                  onChangeText={setPassword}
                  secure
                  error={
                    submitPressed && password.length < 3
                      ? "Mínimo 3 caracteres"
                      : undefined
                  }
                />

                <Input
                  placeholder="REPETIR CONTRASEÑA"
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                  secure
                  error={
                    submitPressed && password !== repeatPassword
                      ? "Las contraseñas deben coincidir"
                      : undefined
                  }
                />

                <MainButton text="SIGUIENTE" onPress={handleStep2} />
              </>
            )}

            {/* ---------------- STEP 3 ---------------- */}
            {step === 3 && (
              <>
                <Input
                  placeholder="PROPIETARIO"
                  value={tipo}
                  onChangeText={setTipo}
                />

                <Input
                  placeholder="DOMICILIO"
                  value={domicilio}
                  onChangeText={setDomicilio}
                  error={
                    submitPressed && domicilio.trim() === ""
                      ? "Necesitas completar el domicilio"
                      : undefined
                  }
                />

                <Input
                  placeholder="EDAD"
                  value={edad}
                  onChangeText={setEdad}
                  keyboardType="numeric"
                  error={
                    submitPressed && edad.trim() === ""
                      ? "Necesitas completar la edad"
                      : undefined
                  }
                />

                <MainButton text="GUARDAR" onPress={handleSave} />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---------- MODAL PRIVACIDAD ---------- */}
      <Modal visible={showPrivacy} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>AVISO DE PRIVACIDAD</Text>

              <Text style={styles.modalText}>
                De conformidad con lo establecido en el artículo 15 y 16 de la
                Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares, se hace de su conocimiento el presente:
              </Text>

              <Text style={styles.modalTitle}>AVISO DE PRIVACIDAD</Text>

              <Text style={styles.modalText}>
                Valo Technology S.A. de C.V., con domicilio ubicado en Av. Paseo
                de las Pitahayas Número Exterior. 13 Número Interior. 37 con
                Código Postal 76269, Municipio de El Marqués perteneciente al
                Estado de Querétaro, es responsable de recabar sus datos
                personales, del uso que se le dé a los mismos y de su
                protección, y al respecto le informamos lo siguiente:
              </Text>

              <Text style={styles.modalTitle}>
                ¿Para qué fines utilizaremos sus datos personales?
              </Text>

              <Text style={styles.modalText}>
                Su información personal será utilizada para las siguientes
                finalidades:
                {"\n"}1. Identificarlo como residente o propietario de un
                inmueble dentro del Fraccionamiento
              </Text>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleAcceptPrivacy}>
                <Text style={styles.modalBtn}>SI ACEPTO</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowPrivacy(false)}>
                <Text style={styles.modalBtn}>NO ACEPTO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- INPUT COMPONENT ---------- */

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  secure?: boolean;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error,
  secure = false,
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
          secureTextEntry={secure}
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

const MainButton = ({ text, onPress }: any) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E5E5E5" },
  container: { flex: 1 },
  header: { backgroundColor: "#000", alignItems: "center" },
  headerImage: { width: 350, height: 200 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  form: { paddingHorizontal: 30, marginTop: 20 },
  inputWrapper: { position: "relative" },
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
  errorX: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "#E53935", fontSize: 12, marginTop: 5 },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 13, color: "#333", marginBottom: 10 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalBtn: { fontWeight: "bold", fontSize: 14 },
});

import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Intro() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/videos/intro.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc", // fondo blanco
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "70%", // tamaño del video
    height: 250, // altura fija
  },
});

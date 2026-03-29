// app/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const seenIntro = await AsyncStorage.getItem("seenIntro");

      if (!seenIntro) {
        router.replace("/intro");
      } else {
        router.replace("/login");
      }
    };

    redirect();
  }, []);

  return null; // pantalla vacía mientras decide
}

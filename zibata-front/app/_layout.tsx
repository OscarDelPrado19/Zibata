import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import type { StatusBarStyle } from "expo-status-bar";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AccessControlProvider } from "@/hooks/features/access-control-store";
import { IncidentsProvider } from "@/hooks/features/incidents-store";
import { VehiclesProvider } from "@/hooks/features/vehicles-store";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout(): React.ReactElement {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const statusBarStyle: StatusBarStyle = isDark ? "light" : "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <IncidentsProvider>
        <VehiclesProvider>
          <AccessControlProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="intro" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />

              <Stack.Screen
                name="modal/crear-incidencia"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="modal/registro-visita"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="modal/registro-empleado"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="modal/registro-proveedor"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="modal/registro-vehiculo"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>

            <StatusBar style={statusBarStyle} hidden={false} />
          </AccessControlProvider>
        </VehiclesProvider>
      </IncidentsProvider>
    </ThemeProvider>
  );
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import type { StatusBarStyle } from 'expo-status-bar';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AccessControlProvider } from '@/hooks/features/access-control-store';
import { IncidentsProvider } from '@/hooks/features/incidents-store';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
} as const;

export default function RootLayout(): React.ReactElement {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const statusBarStyle: StatusBarStyle = isDark ? 'light' : 'dark';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <IncidentsProvider>
        <AccessControlProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="modal/crear-incidencia" options={{ presentation: 'modal', headerShown: false, title: 'Crear Incidencia' }} />
            <Stack.Screen name="modal/registro-visita" options={{ presentation: 'modal', headerShown: false, title: 'Registro de visita' }} />
            <Stack.Screen name="modal/registro-empleado" options={{ presentation: 'modal', headerShown: false, title: 'Registro de empleado' }} />
            <Stack.Screen name="modal/registro-proveedor" options={{ presentation: 'modal', headerShown: false, title: 'Registro de proveedor' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style={statusBarStyle} hidden={false} />
        </AccessControlProvider>
      </IncidentsProvider>
    </ThemeProvider>
  );
}

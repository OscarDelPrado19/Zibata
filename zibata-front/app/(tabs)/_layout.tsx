import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TabBarConfig, TextConfig } from '@/constants/tab-bar-config';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#3f3f3f',
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          position: 'relative',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: isDark ? TabBarConfig.colors.dark.background : TabBarConfig.colors.light.background,
          borderTopWidth: 1,
          borderTopColor: isDark ? TabBarConfig.colors.dark.border : TabBarConfig.colors.light.border,
          height: TabBarConfig.dimensions.height,
          paddingBottom: TabBarConfig.dimensions.paddingBottom,
          paddingTop: TabBarConfig.dimensions.paddingTop,
          shadowColor: isDark ? TabBarConfig.shadows.dark.shadowColor : TabBarConfig.shadows.light.shadowColor,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: isDark ? TabBarConfig.shadows.dark.shadowOpacity : TabBarConfig.shadows.light.shadowOpacity,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: TextConfig.tabLabel.fontSize,
          fontWeight: TextConfig.tabLabel.fontWeight,
          marginTop: TextConfig.tabLabel.marginTop,
          letterSpacing: TextConfig.tabLabel.letterSpacing,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <IconSymbol
                size={26}
                name="house.fill"
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <IconSymbol
                size={26}
                name="person.fill"
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Vehículo',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <IconSymbol
                size={26}
                name="car.fill"
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <IconSymbol
                size={26}
                name="line.3.horizontal"
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  iconContainerFocused: {
    backgroundColor: 'rgba(199, 199, 199, 0.1)',
  },
});

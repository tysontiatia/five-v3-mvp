import { Tabs } from "expo-router";
import React from "react";
import { Gamepad2, Radio, User } from "lucide-react-native";
import { useTheme } from "@/src/providers/ThemeProvider";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.brand,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: theme.typography.h2,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => <Gamepad2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => <Radio size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/colors.constant";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tint,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={"home"} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/subway"
          options={{
            title: "Train",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="train"
                color={color}
                size={24}
                style={{ marginBottom: -3 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/life-style"
          options={{
            title: "LifeStyle",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="target" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="user" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

import { HomeHeader } from "@/components/home/HomeHeader";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/colors.constant";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <HomeHeader />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"home"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="subway"
        options={{
          title: "Train",
          headerShown: false,
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
        name="life-style"
        options={{
          headerShown: false,
          title: "LifeStyle",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="target" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

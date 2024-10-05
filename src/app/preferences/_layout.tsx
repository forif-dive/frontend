import { Header } from "@/components/common/Header";
import { Stack } from "expo-router";

export default function PreferencesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="language"
        options={{ header: () => <Header title="Initial Preferences" /> }}
      />
      <Stack.Screen
        name="field"
        options={{ header: () => <Header title="라이프스타일" /> }}
      />
      <Stack.Screen
        name="category"
        options={{ header: () => <Header title="라이프스타일" /> }}
      />
      <Stack.Screen name="analyze" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="preferences" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast position="bottom" bottomOffset={40} />
    </>
  );
}

import { Header } from "@/components/common/Header";
import useSignIn from "@/hooks/useSignIn";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const { isSignIn, isLoading } = useSignIn();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="initial-prefer"
        options={{ header: () => <Header /> }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

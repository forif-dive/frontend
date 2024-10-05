import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import AnimatedLineDrawing from "@/components/sign-in/AnimatedLineDrawing";
import { Colors } from "@/constants/colors.constant";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();
  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ThemedView
        style={[
          styles.container,
          {
            minHeight: height - 160,
          },
        ]}
      >
        <ThemedText style={styles.title}>
          <ThemedText
            color={Colors.tint}
            style={[styles.title, { fontWeight: "bold" }]}
          >
            동해선
          </ThemedText>
          ,{"\n"}부전역에서 태화강역까지.
        </ThemedText>
        <AnimatedLineDrawing />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Button onPress={() => router.push("/preferences")}>
          바로 시작하기
        </Button>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: "semibold",
    lineHeight: 60,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
});

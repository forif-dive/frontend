import { Button } from "@/components/common/Button";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InitialPreferenceScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ThemedView style={[styles.container]}>
        <ThemedView style={styles.buttonContainer}>
          <Button>다음</Button>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
});

import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { StyleSheet } from "react-native";

export default function LifeStyleScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Hi Life Style!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
});

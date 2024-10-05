import RadioButton from "@/components/common/RadioButton";
import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageScreen() {
  const [isKorean, setIsKorean] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ThemedView style={[styles.container]}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>
          Which Languages do you prefer?
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={{ marginBottom: 40, fontWeight: "medium" }}
          color="#656F79"
        >
          You'll be able to see posts, people, and trends in any languages you
          choose.
        </ThemedText>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
            한국어
          </ThemedText>
          <RadioButton isSelect={isKorean} onPress={() => setIsKorean(true)} />
        </ThemedView>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
            English
          </ThemedText>
          <RadioButton
            isSelect={!isKorean}
            onPress={() => setIsKorean(false)}
          />
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <Button onPress={() => router.push("/preferences/field")}>
            {isKorean ? "다음" : "Next"}
          </Button>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

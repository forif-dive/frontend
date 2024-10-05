import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnalyzeScreen() {
  const { selectedCategories } = useLocalSearchParams() as {
    selectedCategories: string;
  };
  const windowWidth = useWindowWidth();

  const [progress, setProgress] = useState(0);
  const router = useRouter();

  console.log(selectedCategories);

  useEffect(() => {
    if (progress < 1) {
      const timer = setTimeout(() => {
        setProgress((prevProgress) => Math.min(prevProgress + 0.1, 1));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ThemedView style={[styles.container]}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>
          거의 다 되었습니다...
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={{ marginBottom: 40, fontWeight: "medium" }}
          color="#656F79"
        >
          선택한 라이프스타일은 이후 다양한 개인 맞춤형 서비스를 제공하는 데
          사용됩니다.
        </ThemedText>
        <Progress.Bar
          progress={progress}
          width={windowWidth - 48}
          color={Colors.tint}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 128,
          }}
        >
          {progress === 1 ? (
            <Image
              source={require("../../assets/images/3d-check.jpg")}
              style={{
                width: 256,
                height: 256,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/images/3d-fire.png")}
              style={{
                width: 256,
                height: 256,
              }}
            />
          )}
        </View>
        <ThemedView style={styles.buttonContainer}>
          <Button
            onPress={() => router.push("/(tabs)/")}
            disabled={progress !== 1}
          >
            시작하기!
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
    paddingTop: 64,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
});

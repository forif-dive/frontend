import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnalyzeScreen() {
  const windowWidth = useWindowWidth();
  const windowHeight = Dimensions.get("window").height;

  const [progress, setProgress] = useState(0);
  const router = useRouter();

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
      <ThemedView
        style={[
          styles.container,
          {
            minHeight: windowHeight - 160,
          },
        ]}
      >
        <ThemedText type="title" style={{ marginBottom: 8 }}>
          {progress === 1 ? "라이프스타일 분석 완료" : "거의 다 되었습니다..."}
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
                width: 288,
                height: 288,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/images/3d-fishing.png")}
              style={{
                width: 288,
                height: 288,
              }}
            />
          )}
        </View>
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Button
          onPress={() => router.push("/(tabs)/")}
          disabled={progress !== 1}
        >
          준성님으로 시작하기!
        </Button>
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

import { Colors } from "@/constants/colors.constant";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
export type ResultCardProps = {
  picture: string;
  title: string;
  distance: number | string;
  desc: string;
  meter: number;
};

export function ResultCard({
  picture,
  title,
  desc,
  distance,
  meter,
}: ResultCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "성공적으로 저장되었습니다! ⭐",
      text2: "북마크 탭으로 이동하려면 여기를 누르세요.",
    });
  };

  const onSave = () => {
    setIsSaved(true);
    showToast();
  };

  return (
    <ThemedView style={styles.cardContainer}>
      <Image
        source={{
          uri: picture,
        }}
        resizeMode="cover"
        style={{ width: 80, height: 80 }}
      />
      <ThemedView style={styles.textContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          <ThemedText style={{ fontSize: 11, color: Colors.icon }}>
            {meter}m
          </ThemedText>
        </View>
        <ThemedText
          style={{ fontWeight: "medium", fontSize: 15 }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {desc}
        </ThemedText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={onSave}>
            <ThemedText style={{ fontSize: 14, color: Colors.icon }}>
              자세히 보기
            </ThemedText>
          </Pressable>
          <Pressable onPress={onSave}>
            <ThemedText
              style={{
                fontSize: 14,
                color: isSaved ? Colors.icon : Colors.tint,
              }}
            >
              {isSaved ? "저장됨" : "저장"}
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
});

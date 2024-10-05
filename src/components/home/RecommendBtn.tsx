import { Colors } from "@/constants/colors.constant";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../common/ThemedText";

export function RecommendBtn() {
  return (
    <TouchableOpacity style={styles.container}>
      <MaterialIcons name="refresh" size={24} color={Colors.tint} />
      <ThemedText color={Colors.tint}>다른 주제 추천받기</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 24,
  },
});

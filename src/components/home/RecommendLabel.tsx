import { Colors } from "@/constants/colors.constant";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../common/ThemedText";

type RecommendLabelProps = {
  children: ReactNode;
  onPress?: () => void;
};

export function RecommendLabel({ children, onPress }: RecommendLabelProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ThemedText color={Colors.icon}>{children}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.icon,
    padding: 8,
  },
});

import { Colors } from "@/constants/colors.constant";
import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type ChipProps = {
  children: ReactNode;
  onPress?: () => void;
  selected: boolean;
};

export function Chip({ children, onPress, selected }: ChipProps) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.selected]}
      onPress={onPress}
    >
      <ThemedText>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
  },
  selected: {
    borderColor: Colors.tint,
  },
});

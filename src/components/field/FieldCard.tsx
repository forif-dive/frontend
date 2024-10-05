import { Colors } from "@/constants/colors.constant";
import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../common/ThemedText";

type FieldCardProps = {
  children: ReactNode;
  width: number;
  onPress?: () => void;
  selected: boolean;
};

export function FieldCard({
  children,
  width,
  selected,
  onPress,
}: FieldCardProps) {
  return (
    <Pressable
      style={[styles.cardContainer, selected && styles.selected, { width }]}
      onPress={onPress}
    >
      <ThemedText type="defaultSemiBold">{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#FFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
  },
  selected: {
    borderColor: Colors.tint,
    borderWidth: 1,
  },
});

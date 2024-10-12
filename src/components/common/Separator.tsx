import { Colors } from "@/constants/colors.constant";
import { View } from "react-native";

export function Separator({ gap = 8 }: { gap?: number }) {
  return (
    <View
      style={{
        height: 2,
        backgroundColor: Colors.border,
        marginVertical: gap,
      }}
    />
  );
}

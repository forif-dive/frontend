import { Colors } from "@/constants/colors.constant";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
export type LifeStyleCardProps = {
  activity: string;
  Icon: React.ComponentType;
  places: string[];
  onPress?: () => void;
};

export function LifeStyleCard({
  activity,
  Icon,
  places,
  onPress,
}: LifeStyleCardProps) {
  return (
    <ThemedView style={styles.outerContainer}>
      <ThemedView style={styles.innerContainer}>
        <ThemedView
          style={{
            padding: 8,
            width: 48,
            height: 48,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: Colors.tint,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon />
        </ThemedView>
        <ThemedView>
          <View>
            <ThemedText type="subtitle">{activity}</ThemedText>
            <ThemedText>저장된 장소 {places.length}개</ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
      <TouchableOpacity onPress={onPress}>
        <Feather name="more-horizontal" size={24} color={"#000"} />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});

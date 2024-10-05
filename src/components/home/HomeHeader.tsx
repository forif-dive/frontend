import { Colors } from "@/constants/colors.constant";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../common/ThemedText";

const title = "KORAIL DONGHAE";

export function HomeHeader() {
  return (
    <SafeAreaView edges={["top"]} style={styles.header}>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="align-left" size={24} />
      </TouchableOpacity>
      <ThemedText type="subtitle" style={{ fontWeight: "medium" }}>
        {title}
      </ThemedText>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="more-vertical" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
export function Header() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} />
      </TouchableOpacity>
      <ThemedText type="subtitle">Initial Preferences</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: 46 }], // Does React Native Provide Percentage value of translateY?
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

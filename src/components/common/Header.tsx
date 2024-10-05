import { Colors } from "@/constants/colors.constant";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
export function Header({ title = "Header Title" }: { title?: string }) {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}>
      <ThemedView style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} />
        </TouchableOpacity>
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedView />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  backButton: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

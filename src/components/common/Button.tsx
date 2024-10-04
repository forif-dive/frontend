import React, { forwardRef, ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

export const Button = forwardRef<
  TouchableOpacity,
  { children: ReactNode } & TouchableOpacityProps
>(({ children, ...props }, ref) => {
  return (
    <TouchableOpacity style={styles.button} {...props} ref={ref}>
      <ThemedText style={styles.content} type="defaultSemiBold">
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 16,
    alignItems: "center",
  },
  content: {
    color: "white",
    fontSize: 16,
  },
});

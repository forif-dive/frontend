import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
} & TouchableOpacityProps;

export const Button = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { backgroundColor: "#E5E5E5" }]}
      disabled={disabled}
      {...props}
    >
      <ThemedText
        style={styles.content}
        type="defaultSemiBold"
        disabled={disabled}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

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

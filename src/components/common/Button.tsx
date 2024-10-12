import { Colors } from "@/constants/colors.constant";
import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonVariants = "outlined" | "filled" | "text";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariants;
  disabled?: boolean;
} & TouchableOpacityProps;

export const Button = ({
  children,
  disabled,
  variant = "filled",
  ...props
}: ButtonProps) => {
  const textColor = disabled
    ? "#A9A9A9"
    : variant === "filled"
    ? Colors.background
    : Colors.tint;

  return (
    <TouchableOpacity
      style={[styles.common, styles[variant], disabled && styles.disabled]}
      disabled={disabled}
      {...props}
    >
      <ThemedText
        type="headline"
        disabled={disabled}
        style={{ color: textColor }}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  common: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  filled: {
    backgroundColor: Colors.tint,
    color: Colors.background,
  },
  outlined: {
    backgroundColor: "transparent",
    color: Colors.tint,
    borderWidth: 1,
    borderColor: Colors.tint,
  },
  text: {
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: "#E5E5E5",
    borderColor: "#E5E5E5",
  },
});

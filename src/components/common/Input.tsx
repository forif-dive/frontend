import { Colors } from "@/constants/colors.constant";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ ...props }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: isFocused ? Colors.tint : Colors.border,
        },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

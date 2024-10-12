import { Colors } from "@/constants/colors.constant";
import { StyleSheet, Text, type TextProps } from "react-native";

type Typography =
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2";

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: Typography;
};

export function ThemedText({
  style,
  color = Colors.text,
  type = "body",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color },
        { fontFamily: "Pretendard-Medium" },
        { ...typography[type] },
        style,
      ]}
      {...rest}
    />
  );
}

const typography = StyleSheet.create({
  largeTitle: {
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 41,
  },
  title1: {
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 34,
  },
  title2: {
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 28,
  },
  title3: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 25,
  },
  headline: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
  },
  callout: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
  },
  subhead: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  caption1: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  caption2: {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
  },
});

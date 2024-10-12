import { Colors } from "@/constants/colors.constant";
import { useWindowSize } from "@/hooks/useWindowSize";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Line } from "react-native-svg";

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function AnimatedLineDrawing() {
  const x2 = useSharedValue(0);
  const { screenWidth } = useWindowSize();

  const animatedProps = useAnimatedProps(() => {
    return {
      x2: x2.value.toString(),
    };
  });

  useEffect(() => {
    x2.value = withTiming(screenWidth - 48, { duration: 1200 });
  }, [screenWidth, x2]);

  return (
    <View>
      <Svg height="240" width={screenWidth}>
        <AnimatedLine
          x1="0"
          y1="0"
          x2="50"
          y2="0"
          stroke={Colors.tint}
          strokeWidth="8"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

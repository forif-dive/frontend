import { useWindowWidth } from "@/hooks/useWindowWidth";
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
  const windowWidth = useWindowWidth();

  const animatedProps = useAnimatedProps(() => {
    return {
      x2: x2.value.toString(),
    };
  });

  useEffect(() => {
    x2.value = withTiming(windowWidth - 48, { duration: 2000 });
  }, []);

  return (
    <View>
      <Svg height="240" width={windowWidth}>
        <AnimatedLine
          x1="0"
          y1="0"
          x2="50"
          y2="0"
          stroke="black"
          strokeWidth="5"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

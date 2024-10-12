import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export function useWindowSize() {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const update = () => {
      setScreenWidth(Dimensions.get("window").width);
      setScreenHeight(Dimensions.get("window").height);
    };

    const subscription = Dimensions.addEventListener("change", update);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { screenWidth, screenHeight };
}

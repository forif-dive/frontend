import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    const subscription = Dimensions.addEventListener("change", updateWidth);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return windowWidth;
}

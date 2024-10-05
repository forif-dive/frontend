import { useEffect, useState } from "react";

export function useTypingAnimation(text: string, speed: number = 100) {
  const [animatedText, setAnimatedText] = useState(""); // 애니메이션된 텍스트
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 타이핑 중인 글자의 인덱스

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setAnimatedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [text, currentIndex, speed]);

  return animatedText;
}

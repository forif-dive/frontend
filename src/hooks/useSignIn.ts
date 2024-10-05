/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useSignIn = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signIn = async () => {
    setIsSignIn(true);
    await AsyncStorage.setItem("isSignIn", "true"); // 로그인 상태 저장
  };
  const signOut = async () => {
    setIsSignIn(false);
    await AsyncStorage.removeItem("isSignIn"); // 로그인 상태 제거
  };

  return { isSignIn, isLoading, signIn };
};

export default useSignIn;

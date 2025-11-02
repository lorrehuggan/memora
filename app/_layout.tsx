import { useEffect } from "react";

import { useColorScheme } from "react-native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { fontFamily } from "@/styles/fontFamily";
import Providers from "@/utils/Providers";

import "../global.css";
import "../lib/i18n";

export default function RootLayout() {
  const colorScheme = useColorScheme(); // "light" | "dark"
  const [loaded, error] = useFonts({
    [fontFamily.light]: require("../assets/fonts/OpenSans-Light.ttf"),
    [fontFamily.regular]: require("../assets/fonts/OpenSans-Regular.ttf"),
    [fontFamily.bold]: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <Providers>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <Stack>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

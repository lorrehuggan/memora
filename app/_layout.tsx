import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Providers from "@/utils/Providers";

import "../lib/i18n";
import "../lib/styles/root.css";

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

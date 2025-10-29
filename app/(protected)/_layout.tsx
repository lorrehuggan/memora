import { Redirect, Stack } from "expo-router";

const IS_LOGGED_IN = false;
export default function ProtectedLayout() {
  if (!IS_LOGGED_IN) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

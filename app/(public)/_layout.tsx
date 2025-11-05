import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/features/auth/lib/Provider";

export default function ProtectedLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/(protected)/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}

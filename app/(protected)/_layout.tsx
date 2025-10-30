import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/features/auth/lib/Provider";

export default function ProtectedLayout() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

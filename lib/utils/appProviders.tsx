import { useColorScheme } from "react-native";

import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/features/auth/lib/Provider";
import { QueryProvider } from "@/lib/query/provider";
import { NAV_THEME } from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

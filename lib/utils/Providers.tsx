import { useColorScheme } from "react-native";

import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";

import { AuthProvider } from "@/features/auth/lib/Provider";
import { QueryProvider } from "@/features/query/lib/Provider";
import { NAV_THEME } from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
      <PortalHost />
    </ThemeProvider>
  );
}

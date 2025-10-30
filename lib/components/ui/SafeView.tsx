import type { ReactNode } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

interface SafeViewProps {
  children: ReactNode;
  className?: string;
}

export default function SafeView({ children, className, ...rest }: SafeViewProps) {
  return (
    <SafeAreaView className={`h-screen bg-neutral-950 p-4 ${className || ""}`} {...rest}>
      {children}
    </SafeAreaView>
  );
}

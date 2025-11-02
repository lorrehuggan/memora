import type { ReactNode } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/utils/index";

interface SafeViewProps {
  children: ReactNode;
  className?: string;
}

export default function SafeView({ children, className, ...rest }: SafeViewProps) {
  return (
    <SafeAreaView className={cn(className, "h-screen px-4")} {...rest}>
      {children}
    </SafeAreaView>
  );
}

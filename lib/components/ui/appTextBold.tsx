import { Text, type TextProps } from "react-native";

import { fontFamily } from "@/styles/fontFamily";
import { cn } from "@/utils/index";

type AppTextProps = TextProps & {
  children?: React.ReactNode;
};

export default function AppTextBold({ children, style, className, ...rest }: AppTextProps) {
  return (
    <Text
      className={cn("text-foreground", className)}
      style={[{ fontFamily: fontFamily.bold }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

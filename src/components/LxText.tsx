import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export function LxText({ children, ...props }: PropsWithChildren<TextProps>) {
  const theme = useTheme();
  return (
    <Text {...props} style={[{ color: theme.colors.text }, props.style]}>
      {children}
    </Text>
  );
}

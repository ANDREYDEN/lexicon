import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import { Spacing } from "../styling/spacing";
import { LxText } from "./LxText";

interface LxButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  style?: ViewStyle;
  variant?: "primary" | "secondary";
  icon?: ComponentProps<typeof Ionicons>["name"];
}

export function LxButton({
  title,
  style,
  variant = "primary",
  icon,
  ...props
}: LxButtonProps) {
  const theme = useTheme();
  const colorMap: Record<typeof variant, string> = {
    primary: theme.colors.onPrimary,
    secondary: theme.colors.secondary,
  };

  return (
    <Pressable
      style={[
        styles.button,
        variant === "primary" && { backgroundColor: theme.colors.primary },
        variant === "secondary" && {
          borderWidth: 1,
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={24} color={colorMap[variant]} />}
        <LxText style={[styles.text, { color: colorMap[variant] }]}>
          {title}
        </LxText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Spacing.xl_32,
    paddingVertical: Spacing.sm_8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#007AFF",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

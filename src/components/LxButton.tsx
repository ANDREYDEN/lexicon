import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

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
  const colorMap: Record<typeof variant, string> = {
    primary: "#fff",
    secondary: "#007AFF",
  };

  return (
    <Pressable style={[styles.button, styles[variant], style]} {...props}>
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={24} color={colorMap[variant]} />}
        <Text style={[styles.text, { color: colorMap[variant] }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
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

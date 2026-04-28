import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface LxButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  style?: ViewStyle;
  variant?: "primary" | "secondary";
}

export function LxButton({
  title,
  style,
  variant = "primary",
  ...props
}: LxButtonProps) {
  return (
    <Pressable style={[styles.button, styles[variant], style]} {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
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
});

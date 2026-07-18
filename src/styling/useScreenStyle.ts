import { StyleSheet } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export function useScreenStyle() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.text,
    },
  });

  return {
    ...styles,
    headerTintColor: theme.colors.text,
  };
}

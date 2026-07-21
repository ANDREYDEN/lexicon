import { StyleSheet, Switch, View } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import { LxText } from "./LxText";

interface LxSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function LxSwitch({ label, value, onValueChange }: LxSwitchProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <LxText style={styles.label}>{label}</LxText>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.colors.card, true: theme.colors.primary }}
        thumbColor={theme.colors.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
  },
});

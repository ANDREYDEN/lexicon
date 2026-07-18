import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export function SettingsButton() {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    router.push("/settings");
  };

  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
    </Pressable>
  );
}

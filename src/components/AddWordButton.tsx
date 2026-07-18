import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export function AddWordButton() {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    router.push("/words/add");
  };

  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="add-circle-outline" size={24} color={theme.colors.text} />
    </Pressable>
  );
}

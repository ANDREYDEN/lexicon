import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function SettingsButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/settings");
  };

  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="settings-outline" size={24} color="black" />
    </Pressable>
  );
}

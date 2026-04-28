import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function AddWordButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/words/add");
  };

  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="add-circle-outline" size={24} color="black" />
    </Pressable>
  );
}

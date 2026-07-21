import { WordListScreen } from "@/src/screens/WordListScreen/WordListScreen";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const { word } = useLocalSearchParams<{ word?: string }>();
  return <WordListScreen key={word} targetWord={word} />;
}

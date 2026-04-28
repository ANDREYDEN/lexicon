import { FlatList } from "react-native";
import { WordListItem } from "../components/WordListItem";
import { Word } from "../types/word";


export function WordListScreen() {
  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.content}
      renderItem={({ item }) => <WordListItem word={item} />}
    />
  );
}

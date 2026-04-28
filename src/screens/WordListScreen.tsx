import { use } from "react";
import { FlatList } from "react-native";
import { WordListItem } from "../components/WordListItem";
import { WordsContext } from "../providers/wordsProvider";

export function WordListScreen() {
  const { words } = use(WordsContext);

  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.content}
      renderItem={({ item }) => <WordListItem word={item} />}
    />
  );
}

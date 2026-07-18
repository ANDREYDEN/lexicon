import { WordsContext } from "@/src/providers/WordsProvider";
import { use } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { WordListItem } from "./components/WordListItem";

export function WordListScreen() {
  const { words } = use(WordsContext);

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={words}
      keyExtractor={(item) => item.content}
      renderItem={({ item }) => <WordListItem word={item} />}
      ListEmptyComponent={EmptyWordList}
    />
  );
}

function EmptyWordList() {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>Start by adding a word</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 32,
    color: "#888",
  },
});

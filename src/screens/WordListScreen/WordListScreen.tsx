import { WordsContext } from "@/src/providers/WordsProvider";
import { Word } from "@/src/types/word";
import { use, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { WordListItem } from "./components/WordListItem";
import { useScrollToWord } from "./hooks/useScrollToWord";

interface WordListScreenProps {
  targetWord?: string;
}

export function WordListScreen({ targetWord }: WordListScreenProps) {
  const { words } = use(WordsContext);
  const [expandedWords, setExpandedWords] = useState<Record<string, boolean>>(
    () => (targetWord ? { [targetWord]: true } : {}),
  );
  const flatListRef = useRef<FlatList<Word>>(null);

  useScrollToWord({ flatListRef, targetWord, words });

  const toggleExpanded = (content: string) => {
    setExpandedWords((prev) => ({ ...prev, [content]: !prev[content] }));
  };

  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={{ flexGrow: 1 }}
      data={words}
      keyExtractor={(item) => item.content}
      renderItem={({ item }) => (
        <WordListItem
          word={item}
          isExpanded={!!expandedWords[item.content]}
          onToggleExpanded={() => toggleExpanded(item.content)}
        />
      )}
      ListEmptyComponent={EmptyWordList}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
          });
        }, 100);
      }}
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

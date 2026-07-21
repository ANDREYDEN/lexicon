import { Word } from "@/src/types/word";
import { RefObject, useEffect, useRef } from "react";
import { FlatList } from "react-native";

interface ScrollToWordParams {
  flatListRef: RefObject<FlatList<Word> | null>;
  targetWord: string | undefined;
  words: Word[];
}

export function useScrollToWord({
  flatListRef,
  targetWord,
  words,
}: ScrollToWordParams) {
  const hasScrolledToTarget = useRef(false);

  useEffect(() => {
    if (!targetWord || hasScrolledToTarget.current) return;
    const index = words.findIndex((word) => word.content === targetWord);
    if (index === -1) return;
    hasScrolledToTarget.current = true;
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, [flatListRef, targetWord, words]);
}

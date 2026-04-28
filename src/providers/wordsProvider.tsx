import { createContext, useState } from "react";
import { getWords } from "../services/wordRepository";
import { Word } from "../types/word";

interface WordsContextValue {
  words: Word[];
  loadWords: () => Promise<void>;
}

const initialWordsContextValue: WordsContextValue = {
  words: [],
  loadWords: async () => {},
};
export const WordsContext = createContext<WordsContextValue>(initialWordsContextValue);

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);

  const loadWords = async () => {
    const loadedWords = await getWords();
    setWords(loadedWords);
  };

  return (
    <WordsContext
      value={{
        words,
        loadWords,
      }}
    >
      {children}
    </WordsContext>
  );
}

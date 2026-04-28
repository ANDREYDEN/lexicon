import { createContext, useState } from "react";
import { wordRepository } from "../services/wordRepository";
import { Word } from "../types/word";

interface WordsContextValue {
  words: Word[];
  loadWords: () => Promise<void>;
  createWord: (word: Word) => Promise<void>;
}

const initialWordsContextValue: WordsContextValue = {
  words: [],
  loadWords: async () => {},
  createWord: async () => {},
};
export const WordsContext = createContext<WordsContextValue>(
  initialWordsContextValue,
);

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);

  const loadWords = async () => {
    const loadedWords = await wordRepository.getAll();
    setWords(loadedWords);
  };

  const createWord = async (word: Word) => {
    setWords((prev) => [...prev, word]);
    await wordRepository.create(word);
  };

  return (
    <WordsContext
      value={{
        words,
        loadWords,
        createWord,
      }}
    >
      {children}
    </WordsContext>
  );
}

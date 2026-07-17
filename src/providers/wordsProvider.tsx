import { createContext, useState } from "react";
import * as wordRepository from "../services/wordRepository";
import { Word } from "../types/word";

interface WordsContextValue {
  words: Word[];
  loadWords: () => Promise<void>;
  createWord: (word: Word) => Promise<void>;
  deleteWord: (word: Word) => Promise<void>;
  importWords: (words: Word[]) => Promise<void>;
}

const initialWordsContextValue: WordsContextValue = {
  words: [],
  loadWords: async () => {},
  createWord: async () => {},
  deleteWord: async () => {},
  importWords: async () => {},
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

  const deleteWord = async (word: Word) => {
    setWords((prev) => prev.filter((w) => w.content !== word.content));
    await wordRepository.remove(word);
  };

  const importWords = async (importedWords: Word[]) => {
    wordRepository.setAll(importedWords);
    setWords(importedWords);
  };

  return (
    <WordsContext
      value={{
        words,
        loadWords,
        createWord,
        deleteWord,
        importWords,
      }}
    >
      {children}
    </WordsContext>
  );
}

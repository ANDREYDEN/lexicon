import { File, Paths } from "expo-file-system";
import { Word } from "../types/word";

async function getAll() {
  const file = new File(Paths.document, "words.json");
  if (!file.exists) {
    file.create();
    file.write("[]");
    return Promise.resolve([]);
  }
  const textContent = await file.text();
  try {
    return JSON.parse(textContent) as Word[];
  } catch (error) {
    console.error("Failed to parse words.json:", error);
    return [];
  }
}

function setAll(words: Word[]) {
  const file = new File(Paths.document, "words.json");
  if (!file.exists) {
    file.create();
  }
  file.write(JSON.stringify(words));
}

async function create(word: Word) {
  const words = await getAll();
  words.push(word);
  setAll(words);
}

async function remove(word: Word) {
  const words = await getAll();
  const index = words.findIndex((w) => w.content === word.content);
  if (index !== -1) {
    words.splice(index, 1);
    setAll(words);
  }
}

export const wordRepository = {
  getAll,
  create,
  remove,
};

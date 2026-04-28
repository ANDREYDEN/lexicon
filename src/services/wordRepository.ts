import { Word } from "../types/word";

const words: Word[] = [
  {
    content: "serendipity",
    definition:
      "the occurrence and development of events by chance in a happy or beneficial way.",
    createdAt: new Date("2024-01-01"),
  },
  {
    content: "ephemeral",
    definition: "lasting for a very short time.",
    createdAt: new Date("2024-02-01"),
  },
  {
    content: "quintessential",
    definition:
      "representing the most perfect or typical example of a quality or class.",
    createdAt: new Date("2024-03-01"),
  },
];

function getAll() {
  return Promise.resolve([...words]);
}

async function create(word: Word) {
  words.push(word);
}

async function remove(word: Word) {
  const index = words.findIndex((w) => w.content === word.content);
  if (index !== -1) {
    words.splice(index, 1);
  }
}

export const wordRepository = {
  getAll,
  create,
  remove,
};

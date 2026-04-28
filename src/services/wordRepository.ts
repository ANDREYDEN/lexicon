import { Word } from "../types/word";

const words: Word[] = [
  {
    content: "serendipity",
    definition:
      "the occurrence and development of events by chance in a happy or beneficial way.",
    dateAdded: new Date("2024-01-01"),
  },
  {
    content: "ephemeral",
    definition: "lasting for a very short time.",
    dateAdded: new Date("2024-02-01"),
  },
  {
    content: "quintessential",
    definition:
      "representing the most perfect or typical example of a quality or class.",
    dateAdded: new Date("2024-03-01"),
  },
];

export function getWords() {
  return words;
}

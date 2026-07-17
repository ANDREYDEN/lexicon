import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Word } from "../types/word";

async function exportWords(words: Word[]) {
  const fileName = `lexicon-export-${Date.now()}.json`;
  const content = JSON.stringify(words);

  const file = new File(Paths.cache, fileName);
  file.create();
  file.write(content);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, { mimeType: "application/json" });
  }
}

export const exportService = {
  exportWords,
};

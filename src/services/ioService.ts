import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Word } from "../types/word";

export class ImportError extends Error {}

export async function exportWords(words: Word[]) {
  const fileName = `lexicon-export-${Date.now()}.json`;
  const content = JSON.stringify(words);

  const file = new File(Paths.cache, fileName);
  file.create();
  file.write(content);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, { mimeType: "application/json" });
  }
}

export async function pickWords(): Promise<Word[] | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/json",
  });
  if (result.canceled) return null;

  const file = new File(result.assets[0].uri);
  const content = await file.text();
  return parseWords(content);
}

export function parseWords(content: string): Word[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new ImportError("The selected file is not valid JSON.");
  }

  if (!Array.isArray(parsed) || !parsed.every(isWord)) {
    throw new ImportError(
      "The selected file doesn't match the expected words format.",
    );
  }

  return parsed;
}

function isWord(value: unknown): value is Word {
  if (typeof value !== "object" || value === null) return false;
  const word = value as Record<string, unknown>;
  return (
    typeof word.content === "string" &&
    typeof word.definition === "string" &&
    typeof word.createdAt === "string"
  );
}

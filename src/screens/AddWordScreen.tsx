import { useRouter } from "expo-router";
import { use, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { WordsContext } from "../providers/wordsProvider";
import { Word } from "../types/word";

export function AddWordScreen() {
  const [wordContent, setWordContent] = useState("");
  const [wordDefinition, setWordDefinition] = useState("");

  const { createWord } = use(WordsContext);
  const router = useRouter();

  const handleAddWord = () => {
    const newWord: Word = {
      content: wordContent,
      definition: wordDefinition,
      createdAt: new Date(),
    };
    createWord(newWord);
    router.back();
  };

  return (
    <View>
      <TextInput
        placeholder="Type a new word..."
        autoFocus
        onChangeText={setWordContent}
      />
      <TextInput
        placeholder="Definition"
        numberOfLines={3}
        multiline
        onChangeText={setWordDefinition}
      />
      <Button title="Save" onPress={handleAddWord} />
    </View>
  );
}

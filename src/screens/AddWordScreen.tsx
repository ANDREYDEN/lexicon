import { useRouter } from "expo-router";
import { use, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LxButton } from "../components/LxButton";
import { LxTextArea } from "../components/LxTextArea";
import { LxTextInput } from "../components/LxTextInput";
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
    <View style={styles.container}>
      <LxTextInput
        placeholder="Type a new word..."
        autoFocus
        onChangeText={setWordContent}
        value={wordContent}
      />
      <LxTextArea
        placeholder="Definition"
        onChangeText={setWordDefinition}
        value={wordDefinition}
      />
      <View style={styles.buttonContainer}>
        <LxButton title="Save" onPress={handleAddWord} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    gap: 16,
  },
  buttonContainer: {
    alignItems: "stretch",
  },
});

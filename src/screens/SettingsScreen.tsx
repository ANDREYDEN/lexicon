import { use } from "react";
import { StyleSheet, View } from "react-native";
import { LxButton } from "../components/LxButton";
import { WordsContext } from "../providers/wordsProvider";
import { exportService } from "../services/exportService";

export function SettingsScreen() {
  const { words } = use(WordsContext);

  const handleExport = () => {
    exportService.exportWords(words);
  };

  return (
    <View style={styles.container}>
      <LxButton
        title="Export Data"
        variant="secondary"
        icon="arrow-up-circle"
        onPress={handleExport}
      />
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
});

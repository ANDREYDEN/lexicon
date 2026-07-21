import { use } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { LxButton } from "../components/LxButton";
import { LxSwitch } from "../components/LxSwitch";
import { NotificationsContext } from "../providers/NotificationsProvider";
import { WordsContext } from "../providers/WordsProvider";
import * as ioService from "../services/ioService";

export function SettingsScreen() {
  const { words, importWords } = use(WordsContext);
  const { settings, setNotificationsEnabled } = use(NotificationsContext);

  const handleToggleNotifications = async (next: boolean) => {
    const applied = await setNotificationsEnabled(next);
    if (next && !applied) {
      Alert.alert(
        "Permission Needed",
        "Enable notifications for Lexicon in your device settings to receive word reminders.",
      );
    }
  };

  const handleExport = () => {
    ioService.exportWords(words);
  };

  const handleImport = async () => {
    let importedWords;
    try {
      importedWords = await ioService.pickWords();
    } catch (error) {
      const message =
        error instanceof ioService.ImportError
          ? error.message
          : "Something went wrong while reading the file.";
      Alert.alert("Import Failed", message);
      return;
    }
    if (!importedWords) return;

    Alert.alert(
      "Import Data",
      `This will replace your current ${words.length} word(s) with ${importedWords.length} word(s) from the file. This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Import",
          style: "destructive",
          onPress: () => importWords(importedWords),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <LxSwitch
        label="Word Reminders"
        value={settings.notificationsEnabled}
        onValueChange={handleToggleNotifications}
      />
      <LxButton
        title="Export Data"
        variant="secondary"
        icon="arrow-up-circle"
        onPress={handleExport}
      />
      <LxButton
        title="Import Data"
        variant="secondary"
        icon="arrow-down-circle"
        onPress={handleImport}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});

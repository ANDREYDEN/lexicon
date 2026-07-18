import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as SplashScreen from "expo-splash-screen";
import { use } from "react";
import { AddWordButton } from "../components/AddWordButton";
import { SettingsButton } from "../components/SettingsButton";
import { useSplashScreen } from "../hooks/useSplashScreen";
import { ThemeProvider } from "../providers/ThemeProvider";
import { WordsContext, WordsProvider } from "../providers/WordsProvider";
import { useScreenStyle } from "../styling/useScreenStyle";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <WordsProvider>
          <Screens />
        </WordsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function Screens() {
  const screenStyle = useScreenStyle();
  const { loadWords } = use(WordsContext);
  const isReady = useSplashScreen(loadWords);

  if (!isReady) return null;

  return (
    <Stack screenOptions={{ ...screenStyle, }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Lexicon",
          headerLeft: SettingsButton,
          headerRight: AddWordButton,
        }}
      />
      <Stack.Screen
        name="words/add"
        options={{ title: "New Word", headerBackButtonDisplayMode: "minimal" }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "Settings", headerBackButtonDisplayMode: "minimal" }}
      />
    </Stack>
  );
}

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WordsContext, WordsProvider } from "../providers/wordsProvider";

import * as SplashScreen from "expo-splash-screen";
import { use } from "react";
import { useSplashScreen } from "../hooks/useSplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <WordsProvider>
        <Screens />
      </WordsProvider>
    </GestureHandlerRootView>
  );
}

function Screens() {
  const { loadWords } = use(WordsContext);
  const isReady = useSplashScreen(loadWords);

  if (!isReady) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Lexicon" }} />
    </Stack>
  );
}

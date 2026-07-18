import { createContext, PropsWithChildren, use } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "../styling/theme";

const initialTheme: Theme = lightTheme;
const ThemeContext = createContext(initialTheme);

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = use(ThemeContext);
  return theme;
}

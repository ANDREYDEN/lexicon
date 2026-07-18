export interface Theme {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: "#6200ee",
    onPrimary: "#ffffff",
    secondary: "#03dac6",
    background: "#ffffff",
    card: "#f5f5f5",
    text: "#000000",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#bb86fc",
    onPrimary: "#ffffff",
    secondary: "#03dac6",
    background: "#121212",
    card: "#1f1f1f",
    text: "#ffffff",
  },
};

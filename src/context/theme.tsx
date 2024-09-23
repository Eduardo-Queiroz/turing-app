import React, { useState, useEffect, ReactNode } from "react";
import { ThemeProvider as ReStyleThemeProvider } from "@shopify/restyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, defaultTheme, ThemeType } from "../theme";

export interface ThemeContextProps {
  colorScheme: ThemeType;
  toggleColorScheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  colorScheme: "light",
  toggleColorScheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_KEY = "THEME_COLOR_SCHEMA";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme === "light" || savedTheme === "dark") {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error("Erro ao carregar o tema:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleColorScheme = async () => {
    const newTheme: ThemeType = colorScheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error("Erro ao salvar o tema:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <ReStyleThemeProvider
        theme={colorScheme == "light" ? defaultTheme : darkTheme}
      >
        {children}
      </ReStyleThemeProvider>
    </ThemeContext.Provider>
  );
};

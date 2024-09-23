import React, { useContext } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider, ThemeContext } from "@turing-app/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button } from "react-native";

jest.mock("@react-native-async-storage/async-storage");

jest.mock("@shopify/restyle");

const TestComponent = () => {
  const { colorScheme, toggleColorScheme } = useContext(ThemeContext);
  return (
    <>
      <Text testID="currentTheme">{colorScheme}</Text>
      <Button
        testID="toggleButton"
        title="Toggle Theme"
        onPress={toggleColorScheme}
      />
    </>
  );
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default theme 'light' when no theme is stored", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("light");
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("THEME_COLOR_SCHEMA");
  });

  it("should initialize with theme 'dark' when 'dark' is stored in AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("dark");
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("THEME_COLOR_SCHEMA");
  });

  it("should toggle theme from 'light' to 'dark' and save to AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("light");
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(null);

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("light");
    });

    fireEvent.press(getByTestId("toggleButton"));

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("dark");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "THEME_COLOR_SCHEMA",
      "dark"
    );
  });

  it("should toggle theme from 'dark' to 'light' and save to AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(null);

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("dark");
    });

    fireEvent.press(getByTestId("toggleButton"));

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("light");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "THEME_COLOR_SCHEMA",
      "light"
    );
  });

  it("should handle error when loading theme from AsyncStorage", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
      new Error("Failed to load theme")
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("light");
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao carregar o tema:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when saving theme to AsyncStorage", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("light");
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(
      new Error("Failed to save theme")
    );

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("light");
    });

    fireEvent.press(getByTestId("toggleButton"));

    await waitFor(() => {
      expect(getByTestId("currentTheme").props.children).toBe("dark");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "THEME_COLOR_SCHEMA",
      "dark"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao salvar o tema:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});

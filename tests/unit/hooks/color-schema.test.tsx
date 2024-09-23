import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { ThemeContext, ThemeContextProps } from "@turing-app/context";
import { useColorSchema } from "@turing-app/hooks";

const mockTheme: any = {
  colorScheme: "light",
};

const renderUseColorSchema = (themeContextValue: ThemeContextProps | null) => {
  return renderHook(() => useColorSchema(), {
    wrapper: (({ children }) =>
      !!themeContextValue ? (
        <ThemeContext.Provider value={themeContextValue}>
          {children}
        </ThemeContext.Provider>
      ) : (
        <>{children}</>
      )) as React.FC<unknown>,
  });
};

describe("useColorSchema", () => {
  test("deve retornar o contexto de tema quando usado dentro do ThemeProvider", () => {
    const { result } = renderUseColorSchema(mockTheme);

    expect(result.current).toBe(mockTheme);
    expect(result.current.colorScheme).toBe("light");
  });

  test("deve lançar um erro quando usado fora do ThemeProvider", () => {
    try {
      renderUseColorSchema(null);
    } catch (error) {
      expect(error).toEqual(
        new Error("useTheme must be used inside a ThemeProvider")
      );
    }
  });
});

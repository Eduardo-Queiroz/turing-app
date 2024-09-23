import React from "react";

export const createTheme = jest.fn((themeConfig) => themeConfig);

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) => <>{children}</>;

import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "@turing-app/hooks";

export const LoaderCore = () => {
  const { colors } = useTheme();
  return <ActivityIndicator color={colors.secondary} />;
};

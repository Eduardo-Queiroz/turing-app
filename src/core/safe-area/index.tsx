import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoxCore } from "../box";
import { StatusBar } from "expo-status-bar";

type SafeAreaCoreProps = { children: ReactElement | ReactElement[] };

export const SafeAreaCore = ({ children }: SafeAreaCoreProps) => {
  return (
    <BoxCore backgroundColor="surface" flex={1}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </BoxCore>
  );
};

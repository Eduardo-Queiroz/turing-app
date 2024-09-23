import { BoxCore } from "@turing-app/core";
import { StatusBar } from "expo-status-bar";
import { ErrorComponent } from "@turing-app/components";
import RNRestart from "react-native-restart";

export const ErrorScreen = () => (
  <BoxCore padding="l" backgroundColor="surface" alignItems="center">
    <StatusBar style="light" />
    <ErrorComponent retry={() => RNRestart.restart()} />
  </BoxCore>
);

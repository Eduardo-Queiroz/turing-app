import { AnimatedIcon, BoxCore, TextCore } from "@turing-app/core";
import { ButtonComponent } from "../button";
import { SafeAreaView } from "react-native-safe-area-context";

import ErrorAnimation from "../../../assets/animations/error.json";

type ErrorComponentProps = { retry: () => void };

export const ErrorComponent = ({ retry }: ErrorComponentProps) => (
  <BoxCore flex={1} backgroundColor="surface" alignItems="center">
    <SafeAreaView>
      <BoxCore flex={1} justifyContent="space-between">
        <BoxCore padding="m" alignItems="center" marginTop="xxl">
          <AnimatedIcon source={ErrorAnimation} variant="medium" />

          <TextCore variant="subtitle" color="secondary" textAlign="center">
            An internal error has occurred. We will resolve this as soon as
            possible.
          </TextCore>
        </BoxCore>

        <BoxCore alignItems="center" marginBottom="xxl">
          <ButtonComponent text={"Try Again"} onPress={retry} />
        </BoxCore>
      </BoxCore>
    </SafeAreaView>
  </BoxCore>
);

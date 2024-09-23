import { AnimatedIcon, BoxCore } from "@turing-app/core";

import LoadingAnimation from "../../../../../assets/animations/loader.json";
import { MotiView } from "moti";

export const HomeLoadingContainer = () => {
  return (
    <BoxCore
      flex={1}
      justifyContent="center"
      alignContent="center"
      alignSelf="center"
      paddingBottom="xxl"
    >
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 200,
        }}
      >
        <AnimatedIcon source={LoadingAnimation} variant="small" />
      </MotiView>
    </BoxCore>
  );
};

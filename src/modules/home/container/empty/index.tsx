import { AnimatedIcon, BoxCore, TextCore } from "@turing-app/core";

import EmptyAnimation from "../../../../../assets/animations/empty-message.json";

export const HomeEmptyContainer = () => {
  return (
    <BoxCore flex={1} padding="m" alignItems="center" marginTop="xxl">
      <AnimatedIcon source={EmptyAnimation} variant="medium" />
      <TextCore variant="subtitle" color="secondary" textAlign="center">
        Add a room in the edit icon near to top right corner
      </TextCore>
    </BoxCore>
  );
};

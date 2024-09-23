import React from "react";
import { BoxCore } from "../box";
import {
  composeRestyleFunctions,
  VariantProps,
  createVariant,
  useRestyle,
  SpacingProps,
  BackgroundColorProps,
} from "@shopify/restyle";
import { Theme } from "@turing-app/theme";

type RestyleProps = VariantProps<Theme, "circleVariants"> &
  SpacingProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  createVariant({ themeKey: "circleVariants" }),
]);

export const CircleCore = (props: RestyleProps) => {
  const themeProps = useRestyle(restyleFunctions, props);
  return <BoxCore {...themeProps} borderRadius="circular" />;
};

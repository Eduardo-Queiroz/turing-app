import React, { ComponentProps } from "react";
import {
  composeRestyleFunctions,
  VariantProps,
  createVariant,
  useRestyle,
  SpacingProps,
  spacing,
} from "@shopify/restyle";
import { Theme } from "@turing-app/theme";
import LottieView from "lottie-react-native";

type RestyleProps = VariantProps<Theme, "animatedIconVariats"> &
  SpacingProps<Theme>;

type AnimatedIconProps = {
  source: ComponentProps<typeof LottieView>["source"];
} & RestyleProps;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  createVariant({ themeKey: "animatedIconVariats" }),
  spacing,
]);

export const AnimatedIcon = ({ source, ...rest }: AnimatedIconProps) => {
  const themeProps = useRestyle(restyleFunctions, rest);
  return <LottieView source={source} autoPlay {...themeProps} />;
};

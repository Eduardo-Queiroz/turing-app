import React from "react";
import {
  border,
  BorderProps,
  composeRestyleFunctions,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import { Skeleton } from "moti/skeleton";
import { Theme } from "@turing-app/theme";
import { DimensionValue } from "react-native";
import { useColorSchema } from "@turing-app/hooks";

type RestyleProps = BorderProps<Theme>;

export type SkeletonCoreProps = {
  height: DimensionValue;
  width: DimensionValue;
} & RestyleProps;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([border]);

export const SkeletonContentCore = ({
  height,
  width,
  ...rest
}: SkeletonCoreProps) => {
  const themeProps = useRestyle(restyleFunctions, rest);
  const { colorScheme } = useColorSchema();
  return (
    <Skeleton
      colorMode={colorScheme}
      height={height}
      width={width}
      {...themeProps}
    />
  );
};

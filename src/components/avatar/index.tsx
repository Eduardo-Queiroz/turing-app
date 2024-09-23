import {
  BackgroundColorProps,
  composeRestyleFunctions,
  createVariant,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import { Theme } from "@turing-app/theme";
import { ImageCore } from "@turing-app/core/image";
import { BoxCore } from "@turing-app/core";

type RestyleProps = VariantProps<Theme, "avatarVariants"> &
  BackgroundColorProps<Theme>;

export type AvatarComponentProps = {
  uri: string;
  cacheKey: string;
  name: string;
} & RestyleProps;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  createVariant({ themeKey: "avatarVariants" }),
]);

export const AvatarComponent = ({
  uri,
  cacheKey,
  name,
  ...rest
}: AvatarComponentProps) => {
  const themeProps = useRestyle(restyleFunctions, rest);
  return (
    <BoxCore {...themeProps}>
      <ImageCore
        cacheKey={cacheKey}
        fallbackUri={require("./../../../assets/images/avatar.jpg")}
        uri={uri}
        borderRadius="circular"
      />
    </BoxCore>
  );
};

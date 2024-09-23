import { useState } from "react";
import CachedImage from "expo-cached-image";
import { Image as RNImage, StyleSheet } from "react-native";
import { SkeletonContainerCore, SkeletonContentCore } from "../skeleton";
import {
  border,
  BorderProps,
  composeRestyleFunctions,
  useRestyle,
} from "@shopify/restyle";
import { Theme } from "@turing-app/theme";
import { BoxCore } from "..";

type RestyleProps = BorderProps<Theme>;

type ImageCoreProps = {
  uri: string;
  fallbackUri: number | undefined;
  cacheKey: string;
} & RestyleProps;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([border]);

export const ImageCore = ({
  uri,
  fallbackUri,
  cacheKey,
  ...rest
}: ImageCoreProps) => {
  const [error, setError] = useState(false);
  const themeProps = useRestyle(restyleFunctions, rest);
  return (
    <BoxCore overflow="hidden" {...themeProps}>
      {!error ? (
        <CachedImage
          style={styles.image}
          cacheKey={cacheKey}
          onError={() => setError(true)}
          source={{
            uri,
          }}
          placeholderContent={
            <SkeletonContainerCore>
              <SkeletonContentCore height={"100%"} width={"100%"} {...rest} />
            </SkeletonContainerCore>
          }
        />
      ) : (
        <RNImage style={styles.image} source={fallbackUri} resizeMode="cover" />
      )}
    </BoxCore>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
});

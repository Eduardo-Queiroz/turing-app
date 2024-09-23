import { BoxCore, LoaderCore } from "@turing-app/core";
import { TouchableOpacity } from "react-native";
import { IconCore, IconCoreProps } from "@turing-app/core/icon";
import { BorderProps, ColorProps } from "@shopify/restyle";
import { Theme } from "@turing-app/theme";

type IconButtonProps = {
  onPress: () => void;
  loading?: boolean;
  borderRadius?: BorderProps<Theme>["borderRadius"];
  backgroundColor?: ColorProps<Theme>["color"];
};

export type IconButtonComponentProps = IconButtonProps & IconCoreProps;

export const IconButtonComponent = ({
  onPress,
  loading = false,
  backgroundColor = "transparent",
  borderRadius = "none",
  ...iconProps
}: IconButtonComponentProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <BoxCore
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        marginHorizontal="m"
        paddingHorizontal="m"
        paddingVertical="m"
      >
        {!loading ? <IconCore {...iconProps} /> : <LoaderCore />}
      </BoxCore>
    </TouchableOpacity>
  );
};

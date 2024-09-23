import {
  createVariant,
  createRestyleComponent,
  VariantProps,
} from "@shopify/restyle";
import { buttonTypes, Theme } from "@turing-app/theme";
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  Text as RNText,
} from "react-native";

type BaseButtonProps = TouchableOpacityProps &
  VariantProps<Theme, "buttonVariants">;
const BaseButton = createRestyleComponent<BaseButtonProps, Theme>(
  [createVariant({ themeKey: "buttonVariants" })],
  TouchableOpacity
);

type BaseTextProps = TextProps & VariantProps<Theme, "buttonTextVariants">;
const BaseButtonText = createRestyleComponent<BaseTextProps, Theme>(
  [createVariant({ themeKey: "buttonTextVariants" })],
  RNText
);
type ButtonProps = {
  onPress: () => void;
  text: string;
  variant?: buttonTypes;
};

export const ButtonComponent = ({
  text,
  onPress,
  variant = "primary",
}: ButtonProps) => {
  return (
    <BaseButton onPress={onPress} variant={variant}>
      <BaseButtonText variant={variant}>{text}</BaseButtonText>
    </BaseButton>
  );
};

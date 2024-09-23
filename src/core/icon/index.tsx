import { ColorProps, VariantProps } from "@shopify/restyle";
import { MaterialIcons } from "@expo/vector-icons";
import { Theme } from "@turing-app/theme";
import { useTheme } from "@turing-app/hooks";

export type IconNameType = React.ComponentProps<typeof MaterialIcons>["name"];

export type IconCoreProps = {
  name: IconNameType;
  size?: VariantProps<Theme, "iconVariants">["variant"];
} & ColorProps<Theme>;

export const IconCore: React.FC<IconCoreProps> = ({
  size = "medium",
  color = "primary",
  name,
}) => {
  const { iconVariants, colors } = useTheme();
  const sizeValue = iconVariants[size]?.size || 24;
  const colorValue = colors[color];

  return (
    <MaterialIcons
      name={name}
      size={sizeValue}
      color={colorValue}
      selectionColor={colors.primary}
    />
  );
};

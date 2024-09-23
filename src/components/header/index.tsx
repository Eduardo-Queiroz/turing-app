import { BoxCore, IconNameType, TextCore } from "@turing-app/core";
import { IconButtonComponent } from "../icon-button";

type HeaderProps = {
  title: string;
  rightIcon?: IconNameType;
  rightAction?: () => void;
  leftIcon?: IconNameType;
  leftAction?: () => void;
  leftLoading?: boolean;
};

export const Header = ({
  title,
  rightIcon,
  rightAction = () => {},
  leftIcon,
  leftAction = () => {},
  leftLoading,
}: HeaderProps) => (
  <BoxCore
    alignItems="center"
    flexDirection="row"
    justifyContent="space-between"
  >
    <BoxCore flex={1} alignItems="flex-start">
      {rightIcon && (
        <IconButtonComponent
          size="medium"
          name={rightIcon}
          onPress={rightAction}
        />
      )}
    </BoxCore>

    <BoxCore flex={2} alignItems="center">
      <TextCore variant="title">{title.toUpperCase()}</TextCore>
    </BoxCore>

    <BoxCore flex={1} alignItems="flex-end">
      {leftIcon && (
        <IconButtonComponent
          size="medium"
          name={leftIcon}
          onPress={leftAction}
          loading={leftLoading}
        />
      )}
    </BoxCore>
  </BoxCore>
);

import { IconButtonComponent } from "@turing-app/components";
import { BoxCore } from "@turing-app/core";

type CameraCloseContainerProps = {
  onClose: () => void;
};

export const CameraCloseContainer: React.FC<CameraCloseContainerProps> = ({
  onClose,
}) => (
  <BoxCore margin="m" alignItems="flex-start">
    <IconButtonComponent
      borderRadius="circular"
      backgroundColor="semiTransparent"
      color="neutral0"
      size="large"
      name="close"
      onPress={onClose}
    />
  </BoxCore>
);

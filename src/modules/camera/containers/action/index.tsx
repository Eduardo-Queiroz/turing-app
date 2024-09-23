import { IconButtonComponent } from "@turing-app/components";
import { BoxCore } from "@turing-app/core";
import { TouchableOpacity } from "react-native";

type CameraActionContainerProps = {
  onImageSelect: () => void;
  onTakePicture: () => void;
  onToggleCameraFacing: () => void;
};
export const CameraActionContainer: React.FC<CameraActionContainerProps> = ({
  onImageSelect,
  onTakePicture,
  onToggleCameraFacing,
}) => (
  <BoxCore
    marginHorizontal="xxl"
    marginVertical="m"
    flexDirection="column-reverse"
  >
    <BoxCore flexDirection="row" marginBottom="xxl">
      <BoxCore flex={1} alignItems="flex-start">
        <IconButtonComponent
          borderRadius="circular"
          backgroundColor="semiTransparent"
          color="neutral0"
          size="large"
          name="collections"
          onPress={onImageSelect}
        />
      </BoxCore>

      <BoxCore flex={1} alignItems="center">
        <TouchableOpacity onPress={onTakePicture}>
          <BoxCore
            borderWidth={3}
            borderColor="semiTransparent"
            backgroundColor="neutral0"
            height={50}
            width={50}
            borderRadius="circular"
          />
        </TouchableOpacity>
      </BoxCore>

      <BoxCore flex={1} alignItems="flex-end">
        <IconButtonComponent
          borderRadius="circular"
          backgroundColor="semiTransparent"
          color="neutral0"
          size="large"
          name="cameraswitch"
          onPress={onToggleCameraFacing}
        />
      </BoxCore>
    </BoxCore>
  </BoxCore>
);

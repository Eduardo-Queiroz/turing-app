import { ButtonComponent } from "@turing-app/components";
import { BoxCore, TextCore } from "@turing-app/core";
import * as ImagePicker from "expo-image-picker";

type CameraPermissionContainerProps = {
  requestPermission: () => Promise<ImagePicker.PermissionResponse>;
};

export const CameraPermissionContainer: React.FC<
  CameraPermissionContainerProps
> = ({ requestPermission }) => (
  <BoxCore
    flex={1}
    backgroundColor="surface"
    justifyContent="center"
    alignItems="center"
  >
    <TextCore variant="subtitle" color="secondary">
      We need your permission to show the camera
    </TextCore>
    <BoxCore marginTop="l" width={300} alignItems="center">
      <ButtonComponent
        variant="primary"
        onPress={requestPermission}
        text="GRAND PERMISSION"
      />
    </BoxCore>
  </BoxCore>
);

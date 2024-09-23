import { useNavigation, useRoute } from "@react-navigation/native";
import { BoxCore } from "@turing-app/core";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraActionContainer } from "../containers/action";
import { CameraPermissionContainer } from "../containers/permission";
import { CameraCloseContainer } from "../containers/close";
import { CameraRouteParams } from "@turing-app/types";
import { useCamera } from "@turing-app/hooks";

export const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation();
  const {
    params: { onSave },
  } = useRoute<CameraRouteParams>();

  const { handleImageSelection, handleTakePicture } = useCamera(
    cameraRef,
    (picture) => {
      onSave(picture);
      closeCamera();
    }
  );

  if (!permission || !permission.granted) {
    return <CameraPermissionContainer requestPermission={requestPermission} />;
  }

  const closeCamera = () => {
    navigation.goBack();
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <BoxCore flex={1} justifyContent="center">
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <SafeAreaView style={styles.safearea}>
          <CameraCloseContainer onClose={closeCamera} />
          <CameraActionContainer
            onImageSelect={handleImageSelection}
            onTakePicture={handleTakePicture}
            onToggleCameraFacing={toggleCameraFacing}
          />
        </SafeAreaView>
      </CameraView>
    </BoxCore>
  );
};

const styles = StyleSheet.create({
  camera: { flex: 1 },
  safearea: {
    flex: 1,
    justifyContent: "space-between",
  },
});

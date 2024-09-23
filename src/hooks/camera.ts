import {
    CameraCapturedPicture,
    CameraView,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import ImageResizer from "react-native-image-resizer";
import { readAsStringAsync, EncodingType } from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import Toast from "react-native-toast-message";
import { RefObject } from "react";
import { MessageType } from "@flyerhq/react-native-chat-ui";

export const useCamera = (cameraRef: RefObject<CameraView>, onSave: (picture: MessageType.PartialImage) => void) => {
    const sendImage = async (
        picture: CameraCapturedPicture | ImagePickerAsset
    ) => {
        try {
            const base64 = await readAsStringAsync(picture.uri, {
                encoding: EncodingType.Base64,
            });

            onSave({
                type: "image",
                size: 0,
                name: "image",
                uri: `data:image/*;base64,${base64}`,
            });

        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Oops...",
                text2: "Happen a error while you take a photo",
            });
        }
    };

    const handleTakePicture = () => {
        if (cameraRef && cameraRef.current) {
            cameraRef.current.takePictureAsync({
                onPictureSaved: async (picture) => {
                    try {
                        const compressedImage = await ImageResizer.createResizedImage(
                            picture.uri,
                            picture.width / 2,
                            picture.height / 2,
                            "JPEG",
                            30
                        );

                        sendImage(compressedImage)
                    } catch (e) {
                        Toast.show({
                            type: "error",
                            text1: "Oops...",
                            text2: "Happen a error while we resize your photo",
                        });
                    }
                }
            });
        }
    };

    const handleImageSelection = async () => {
        const { assets } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 0.2,
        })
        if (!!assets && assets.length)
            sendImage(assets[0]);
    };

    return { handleImageSelection, handleTakePicture }
}
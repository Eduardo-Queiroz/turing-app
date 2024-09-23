import { renderHook, act } from "@testing-library/react-hooks";
import * as FileSystem from "expo-file-system";
import ImageResizer from "react-native-image-resizer";
import ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { RefObject } from "react";
import { CameraView } from "expo-camera";
import { useCamera } from "@turing-app/hooks";

jest.mock("expo-file-system");
jest.mock("react-native-image-resizer");
jest.mock("expo-image-picker");
jest.mock("react-native-toast-message");
jest.mock("expo-camera");

describe("useCamera Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockCameraRef = () => {
    const mockTakePictureAsync = jest.fn();
    const cameraRef = {
      current: {
        takePictureAsync: mockTakePictureAsync,
      },
    } as unknown as RefObject<CameraView>;
    return { cameraRef, mockTakePictureAsync };
  };

  it("should send a message after taking a picture", async () => {
    const { cameraRef, mockTakePictureAsync } = createMockCameraRef();
    const onSave = jest.fn();

    const capturedPicture = {
      uri: "file://path/to/captured/image.jpg",
      width: 800,
      height: 600,
    };
    mockTakePictureAsync.mockResolvedValue(capturedPicture);

    const resizedImage = {
      uri: "file://path/to/resized/image.jpg",
      width: 400,
      height: 300,
    };
    (ImageResizer.createResizedImage as jest.Mock).mockResolvedValue(
      resizedImage
    );

    const base64String = "base64encodedstring";
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValue(base64String);

    const { result } = renderHook(() => useCamera(cameraRef, onSave));

    await act(async () => {
      result.current.handleTakePicture();
    });

    expect(mockTakePictureAsync).toHaveBeenCalledWith({
      onPictureSaved: expect.any(Function),
    });

    const onPictureSaved = mockTakePictureAsync.mock.calls[0][0].onPictureSaved;
    await act(async () => {
      await onPictureSaved(capturedPicture);
    });

    expect(ImageResizer.createResizedImage).toHaveBeenCalledWith(
      capturedPicture.uri,
      capturedPicture.width / 2,
      capturedPicture.height / 2,
      "JPEG",
      60
    );

    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(
      resizedImage.uri,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    expect(onSave).toHaveBeenCalledWith({
      type: "image",
      size: 0,
      name: "image",
      uri: `data:image/*;base64,${base64String}`,
    });
  });

  it("should send a message after selecting an image from the gallery", async () => {
    const { cameraRef } = createMockCameraRef();
    const onSave = jest.fn();

    const selectedAsset = {
      uri: "file://path/to/selected/image.jpg",
      fileName: "selectedImage.jpg",
      fileSize: 12345,
      type: "image/jpeg",
    };
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      assets: [selectedAsset],
    });

    const base64String = "base64encodedstringselected";
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValue(base64String);

    const { result } = renderHook(() => useCamera(cameraRef, onSave));

    await act(async () => {
      await result.current.handleImageSelection();
    });

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.6,
    });

    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(
      selectedAsset.uri,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    expect(onSave).toHaveBeenCalledWith({
      type: "image",
      size: 0,
      name: "image",
      uri: `data:image/*;base64,${base64String}`,
    });
  });

  it("should show an error toast if an error occurs while sending the image", async () => {
    const { cameraRef, mockTakePictureAsync } = createMockCameraRef();
    const onSave = jest.fn();

    const capturedPicture = {
      uri: "file://path/to/captured/image.jpg",
      width: 800,
      height: 600,
    };
    mockTakePictureAsync.mockResolvedValue(capturedPicture);

    const resizedImage = {
      uri: "file://path/to/resized/image.jpg",
      width: 400,
      height: 300,
    };
    (ImageResizer.createResizedImage as jest.Mock).mockResolvedValue(
      resizedImage
    );

    (FileSystem.readAsStringAsync as jest.Mock).mockRejectedValue(
      new Error("Failed to read file")
    );

    const { result } = renderHook(() => useCamera(cameraRef, onSave));

    await act(async () => {
      result.current.handleTakePicture();
    });

    const onPictureSaved = mockTakePictureAsync.mock.calls[0][0].onPictureSaved;
    await act(async () => {
      await onPictureSaved(capturedPicture);
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Oops...",
      text2: "Happen a error while you take a photo",
    });

    expect(onSave).not.toHaveBeenCalled();
  });

  it("should not send a message if no asset is selected", async () => {
    const { cameraRef } = createMockCameraRef();
    const onSave = jest.fn();

    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      assets: [],
    });

    const { result } = renderHook(() => useCamera(cameraRef, onSave));

    await act(async () => {
      await result.current.handleImageSelection();
    });

    expect(FileSystem.readAsStringAsync).not.toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });
});

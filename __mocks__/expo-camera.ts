export const CameraView = jest.fn().mockImplementation(() => {
    return {
        takePictureAsync: jest.fn(),
    };
});

const mockCamera = {
    CameraView,
};

export default mockCamera;
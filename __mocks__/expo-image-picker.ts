
export const launchImageLibraryAsync = jest.fn();

const mockImagePicker = {
    launchImageLibraryAsync,
    MediaTypeOptions: {
        Images: 'Images',
    },
};


export const MediaTypeOptions = {
    Images: 'Images',
};

export default mockImagePicker;
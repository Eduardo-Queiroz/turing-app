
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

const AsyncStorage = {
    getItem: mockGetItem,
    setItem: mockSetItem,
};

export default AsyncStorage;
export { mockGetItem, mockSetItem };
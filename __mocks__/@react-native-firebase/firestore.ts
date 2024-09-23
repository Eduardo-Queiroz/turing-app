// __mocks__/@react-native-firebase/firestore.ts

const mockAdd = jest.fn().mockResolvedValue({ id: 'mockDocId' });
const mockUpdate = jest.fn().mockResolvedValue({});
const mockSet = jest.fn().mockResolvedValue({});
const mockDelete = jest.fn().mockResolvedValue({});
const mockGet = jest.fn().mockResolvedValue({ exists: true, data: () => ({ mockData: true }) });

const serverTimestamp = jest.fn(() => ({
    toMillis: () => 0,
}));

let mockQuerySnapshot: any[] = [];

const mockOnSnapshot = jest.fn().mockImplementation((callback: Function) => {
    return jest.fn(); // Função de unsubscribe
});

const mockWhere = jest.fn().mockReturnThis();
const mockOrderBy = jest.fn().mockReturnThis();
const mockLimit = jest.fn().mockReturnThis();

const mockDoc = jest.fn().mockReturnValue({
    update: mockUpdate,
    set: mockSet,
    delete: mockDelete,
    get: mockGet,
    onSnapshot: mockOnSnapshot,
});

const mockCollection = jest.fn().mockReturnValue({
    doc: mockDoc,
    add: mockAdd,
    where: mockWhere,
    orderBy: mockOrderBy,
    limit: mockLimit,
    onSnapshot: mockOnSnapshot,
});

const mockFirestore: any = jest.fn(() => ({
    collection: mockCollection,
}));

mockFirestore.FieldValue = {
    serverTimestamp,
    delete: jest.fn(),
};


const Timestamp = {
    now: jest.fn(() => ({
        toMillis: () => 0,
    })),
};

export default mockFirestore;
export {
    serverTimestamp,
    mockAdd,
    mockUpdate,
    mockSet,
    mockDelete,
    mockGet,
    mockOnSnapshot,
    mockWhere,
    mockOrderBy,
    mockLimit,
    mockDoc,
    mockCollection,
    mockQuerySnapshot,
    Timestamp,
};

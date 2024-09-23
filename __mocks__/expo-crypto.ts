
export const randomUUID = jest.fn(() => 'mocked-uuid-1234');

export const digestStringAsync = jest.fn(
    (
        algorithm: string,
        data: string,
        options?: { encoding: 'base64' | 'hex' | 'utf8' }
    ) => {
        return Promise.resolve('mocked-hash');
    }
);

export default {
    randomUUID,
    digestStringAsync,
};
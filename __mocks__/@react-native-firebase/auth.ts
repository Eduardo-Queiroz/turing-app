
const mockSignInAnonymously = jest.fn();

const auth = () => ({
    signInAnonymously: mockSignInAnonymously,
});

export default auth;
export { mockSignInAnonymously };
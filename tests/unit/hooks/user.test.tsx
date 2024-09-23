import { renderHook, act } from "@testing-library/react-hooks";
import { useUsers, useAuth } from "@turing-app/hooks";
import firestore, {
  mockOnSnapshot,
  mockQuerySnapshot,
} from "./../../../__mocks__/@react-native-firebase/firestore";
import { User } from "@turing-app/types";
import Toast from "react-native-toast-message";

jest.mock("@turing-app/hooks/auth");
jest.mock("@react-native-firebase/firestore");

describe("useUsers Hook", () => {
  const mockUser = {
    id: "user1",
    name: "Current User",
    imageUrl: "current-user.png",
    metadata: {},
    createdAt: null,
    updatedAt: null,
  };

  const mockOtherUser = {
    id: "user2",
    name: "User Two",
    imageUrl: "user-two.png",
    metadata: {},
    createdAt: null,
    updatedAt: null,
  };

  const mockThirdUser = {
    id: "user3",
    name: "User Three",
    imageUrl: "user-three.png",
    metadata: {},
    createdAt: null,
    updatedAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default states when user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toEqual([]);
    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(firestore().collection().onSnapshot).toHaveBeenCalled();
  });

  it("should fetch and set users correctly excluding the current user", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    const { result, waitForNextUpdate } = renderHook(() => useUsers());

    mockQuerySnapshot.push(
      { id: "user2", data: () => mockOtherUser },
      { id: "user3", data: () => mockThirdUser },
      { id: "user1", data: () => mockUser }
    );

    act(() => {
      const callback = mockOnSnapshot.mock.calls[0][0];
      callback({
        forEach: (fn: any) => mockQuerySnapshot.forEach(fn),
      });
    });

    expect(result.current.users).toEqual([mockOtherUser, mockThirdUser]);
  });

  it("should initialize with empty users when no user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toEqual([]);
    expect(firestore().collection).not.toHaveBeenCalled();
  });

  it("should handle empty Firestore snapshot correctly", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    const { result, waitForNextUpdate } = renderHook(() => useUsers());

    act(() => {
      const callback = mockOnSnapshot.mock.calls[0][0];
      callback({
        forEach: (fn: Function) => {},
      });
    });

    expect(result.current.users).toEqual([]);
  });

  it("should handle Firestore errors gracefully", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    mockOnSnapshot.mockImplementation(() => {
      throw new Error("Firestore error");
    });

    renderHook(() => useUsers());

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Oops...",
      text2: "Happen a error while trying to get users. Try again later!",
    });
  });
});

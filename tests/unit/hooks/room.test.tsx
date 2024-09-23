import { renderHook, act } from "@testing-library/react-hooks";
import * as Crypto from "expo-crypto";
import Toast from "react-native-toast-message";
import { useAuth, useMessage, useRooms, useUsers } from "@turing-app/hooks";
import firestore from "@react-native-firebase/firestore";
import {
  MESSAGES_COLLECTION_NAME,
  ROOMS_COLLECTION_NAME,
} from "@turing-app/utils";
import {
  mockAdd,
  mockOnSnapshot,
  mockQuerySnapshot,
  mockUpdate,
} from "../../../__mocks__/@react-native-firebase/firestore";
import { MessageType } from "@flyerhq/react-native-chat-ui";
import { Room, User } from "@turing-app/types";

jest.mock("@turing-app/hooks/auth");
jest.mock("@turing-app/hooks/user");
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("@react-native-firebase/firestore");

const mockUser = { id: "user1" };
const mockOtherUser: User = {
  id: "user2",
  name: "User Two",
  imageUrl: "image.png",
  metadata: {},
};
const mockRoom: Room = {
  id: "room1",
  otherUser: mockOtherUser,
  metadata: {},
  createdAt: 0,
  updatedAt: 0,
  unread: true,
  lastMessage: "Hello",
};

describe("useRooms Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (useUsers as jest.Mock).mockReturnValue({ users: [mockOtherUser] });
  });

  it("should initialize with correct default states", () => {
    const { result } = renderHook(() => useRooms());

    expect(result.current.loading).toBe(true);
    expect(result.current.createRoomLoading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.rooms).toEqual([]);
    expect(result.current.createRoom).toBeInstanceOf(Function);
    expect(result.current.retry).toBeInstanceOf(Function);
  });

  it("should fetch rooms and update the state", async () => {
    const mockRoomData = {
      createdAt: { toMillis: () => 0 },
      updatedAt: { toMillis: () => 0 },
      metadata: {},
      unreadUserId: "user1",
      lastMessage: "Hello",
      users: [mockUser, mockOtherUser],
    };

    // Add documents to mockQuerySnapshot
    mockQuerySnapshot.push(
      { id: "room1", data: () => mockRoomData },
      { id: "room2", data: () => ({ ...mockRoomData, unreadUserId: null }) }
    );

    const { result, waitForNextUpdate } = renderHook(() => useRooms());

    // Verify if onSnapshot was called
    expect(mockOnSnapshot).toHaveBeenCalled();

    // Simulate onSnapshot callback with mocked data
    act(() => {
      const callback = mockOnSnapshot.mock.calls[0][0];
      callback({
        docs: mockQuerySnapshot,
      });
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.rooms).toEqual([
      {
        id: "room1",
        createdAt: 0,
        updatedAt: 0,
        metadata: {},
        unread: true,
        lastMessage: "Hello",
        otherUser: mockOtherUser,
      },
      {
        id: "room2",
        createdAt: 0,
        updatedAt: 0,
        metadata: {},
        unread: false,
        lastMessage: "Hello",
        otherUser: mockOtherUser,
      },
    ]);
  });

  it("should set error state when fetching rooms fails", () => {
    mockOnSnapshot.mockImplementation(() => {
      throw new Error("Firestore error");
    });

    const { result } = renderHook(() => useRooms());

    expect(result.current.error).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it("should create a room correctly", async () => {
    const metadata = { topic: "New Topic" };
    const rawRoom = { id: "room2" };

    mockAdd.mockResolvedValue(rawRoom);

    const { result } = renderHook(() => useRooms());

    await act(async () => {
      const newRoom = await result.current.createRoom(metadata);
      expect(newRoom).toEqual({
        id: "room2",
        metadata,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
        otherUser: mockOtherUser,
      });
    });

    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata,
        userIds: ["user1", "user2"],
        users: [mockUser, mockOtherUser],
      })
    );

    expect(result.current.rooms).toContainEqual(
      expect.objectContaining({
        id: "room2",
        metadata,
        otherUser: mockOtherUser,
      })
    );

    expect(result.current.createRoomLoading).toBe(false);
  });

  it("should handle errors when creating a room", async () => {
    mockAdd.mockImplementation(() => {
      throw new Error("Create room error");
    });

    const { result } = renderHook(() => useRooms());

    await act(async () => {
      const newRoom = await result.current.createRoom();
      expect(newRoom).toBeUndefined();
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Oops...",
      text2: "Happen a error while you create a room",
    });

    expect(result.current.createRoomLoading).toBe(false);
  });

  it("should retry fetching rooms when retry function is called", () => {
    const { result } = renderHook(() => useRooms());

    act(() => {
      result.current.retry();
    });

    expect(firestore().collection).toHaveBeenCalledWith(ROOMS_COLLECTION_NAME);
  });
});

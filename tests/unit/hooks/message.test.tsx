import { renderHook, act } from "@testing-library/react-hooks";
import * as Crypto from "expo-crypto";
import Toast from "react-native-toast-message";
import { useAuth, useMessage } from "@turing-app/hooks";
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
} from "./../../../__mocks__/@react-native-firebase/firestore";
import { MessageType } from "@flyerhq/react-native-chat-ui";
import { Room } from "@turing-app/types";

jest.mock("@turing-app/hooks/auth");
jest.mock("expo-crypto");
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("@react-native-firebase/firestore");

const mockUser = { id: "user1" };
const mockRoom: Room = {
  id: "room1",
  otherUser: {
    id: "user2",
    name: "User Two",
    imageUrl: "image.png",
    metadata: {},
  },
  unread: true,
};

describe("useMessage Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (Crypto.randomUUID as jest.Mock).mockReturnValue("unique-id");
  });

  it("should initialize with correct default states", () => {
    const { result } = renderHook(() => useMessage(mockRoom));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.messages).toEqual([]);
    expect(result.current.flyerhqUser).toEqual({ id: "user1" });
    expect(result.current.otherUserName).toBe("User Two");
  });

  it("should fetch messages and update the state", async () => {
    const mockMessageData = {
      authorId: "user2",
      createdAt: { toMillis: () => 0 },
      updatedAt: { toMillis: () => 0 },
      text: "Hello",
      type: "text",
    };

    mockQuerySnapshot.push(
      { id: "msg1", data: () => mockMessageData },
      { id: "msg2", data: () => ({ ...mockMessageData, text: "Hi" }) }
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useMessage(mockRoom)
    );

    expect(mockOnSnapshot).toHaveBeenCalled();

    act(() => {
      const callback = mockOnSnapshot.mock.calls[0][0];
      callback({
        forEach: (fn: any) => mockQuerySnapshot.forEach(fn),
        docChanges: () => [],
      });
    });

    expect(result.current.messages).toEqual([
      {
        id: "msg1",
        author: { id: "user2" },
        createdAt: 0,
        updatedAt: 0,
        text: "Hello",
        type: "text",
      },
      {
        id: "msg2",
        author: { id: "user2" },
        createdAt: 0,
        updatedAt: 0,
        text: "Hi",
        type: "text",
      },
    ]);
    expect(mockUpdate).toHaveBeenCalledWith({
      unreadUserId: null,
    });

    mockQuerySnapshot.length = 0;
  });

  it("should set error state when fetching messages fails", () => {
    mockOnSnapshot.mockImplementation(() => {
      throw new Error("Firestore error");
    });

    const { result } = renderHook(() => useMessage(mockRoom));

    expect(result.current.error).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it("should send a text message correctly", async () => {
    const mockText = "Test message";
    const partialTextMessage: MessageType.PartialText = {
      text: mockText,
      type: "text",
    };
    const expectedTextMessage: MessageType.Text = {
      author: { id: "user1" },
      id: "unique-id",
      text: mockText,
      type: "text",
    };

    const { result } = renderHook(() => useMessage(mockRoom));

    await act(async () => {
      await result.current.handleSendText(partialTextMessage);
    });

    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining(expectedTextMessage)
    );

    expect(mockUpdate).toHaveBeenCalledWith({
      lastMessage: mockText,
      unreadUserId: "user2",
    });

    expect(result.current.messages).toContainEqual(expectedTextMessage);
  });

  it("should send an image message correctly", async () => {
    const mockImage: MessageType.PartialImage = {
      name: "image",
      size: 0,
      type: "image",
      uri: "http://example.com/image.png",
    };
    const expectedImageMessage: MessageType.Image = {
      name: "image",
      size: 0,
      author: { id: "user1" },
      id: "unique-id",
      type: "image",
      uri: "http://example.com/image.png",
    };

    const { result } = renderHook(() => useMessage(mockRoom));

    await act(async () => {
      await result.current.handleSendImage(mockImage);
    });

    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining(expectedImageMessage)
    );

    expect(mockUpdate).toHaveBeenCalledWith({
      lastMessage: "Sended you a message",
      unreadUserId: "user2",
    });

    expect(result.current.messages).toContainEqual(expectedImageMessage);
  });

  it("should handle errors when sending messages", async () => {
    mockAdd.mockImplementation(() => {
      throw new Error("Send error");
    });

    const { result } = renderHook(() => useMessage(mockRoom));

    await act(async () => {
      await result.current.handleSendText({
        text: "Error message",
        type: "text",
      });
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Oops...",
      text2: "Happen a error while you send a message",
    });

    expect(result.current.messages).not.toContainEqual({
      author: { id: "user1" },
      id: "unique-id",
      text: "Error message",
      type: "text",
    });
  });

  it("should retry fetching messages when retry function is called", () => {
    const { result } = renderHook(() => useMessage(mockRoom));

    act(() => {
      result.current.retry();
    });

    expect(firestore().collection).toHaveBeenCalledWith(
      `${ROOMS_COLLECTION_NAME}/room1/${MESSAGES_COLLECTION_NAME}`
    );
  });
});

import React, { useContext } from "react";
import { Text } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import { AuthProvider, AuthContext } from "@turing-app/context";
import firestore from "@react-native-firebase/firestore";
import { userGenerator } from "@turing-app/utils";
import { mockSignInAnonymously } from "../../../__mocks__/@react-native-firebase/auth";
import {
  mockGetItem,
  mockSetItem,
} from "../../../__mocks__/@react-native-async-storage/async-storage";
import { mockSet } from "../../../__mocks__/@react-native-firebase/firestore";

jest.mock("@react-native-firebase/auth");
jest.mock("@react-native-firebase/firestore");
jest.mock("@react-native-async-storage/async-storage");

const TestComponent = () => {
  const { user, loading, error } = useContext(AuthContext);
  return (
    <>
      <Text testID="user">{user ? user.name : "No User"}</Text>
      <Text testID="loading">{loading ? "Loading" : "Not Loading"}</Text>
      <Text testID="error">{error ? "Error" : "No Error"}</Text>
    </>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load user from AsyncStorage if available", async () => {
    const storedUser = {
      id: "user1",
      name: "Stored User",
      imageUrl: "stored-avatar.png",
      metadata: {},
    };

    mockGetItem.mockResolvedValue(JSON.stringify(storedUser));

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId("loading").props.children).toBe("Not Loading");
      expect(getByTestId("user").props.children).toBe("Stored User");
      expect(getByTestId("error").props.children).toBe("No Error");
    });

    expect(mockGetItem).toHaveBeenCalledWith("AUTH");
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
    expect(mockSetItem).not.toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it("should sign in anonymously and create a new user if no user in AsyncStorage", async () => {
    mockGetItem.mockResolvedValue(null);
    mockSignInAnonymously.mockResolvedValue({
      user: { uid: "user2" },
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId("loading").props.children).toBe("Not Loading");
      expect(getByTestId("user").props.children).toBe("MockedName");
      expect(getByTestId("error").props.children).toBe("No Error");
    });

    expect(mockGetItem).toHaveBeenCalledWith("AUTH");
    expect(mockSignInAnonymously).toHaveBeenCalled();
    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "user2",
        name: "MockedName",
        metadata: {},
      })
    );
  });

  it("should handle error during sign-in anonymously", async () => {
    mockGetItem.mockResolvedValue(null);
    mockSignInAnonymously.mockRejectedValue(new Error("Sign-in failed"));

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId("loading").props.children).toBe("Not Loading");
      expect(getByTestId("user").props.children).toBe("No User");
      expect(getByTestId("error").props.children).toBe("Error");
    });

    expect(mockGetItem).toHaveBeenCalledWith("AUTH");
    expect(mockSignInAnonymously).toHaveBeenCalled();
    expect(firestore().collection).not.toHaveBeenCalled();
    expect(mockSetItem).not.toHaveBeenCalled();
  });

  it("should handle error during loading user from AsyncStorage", async () => {
    mockGetItem.mockRejectedValue(new Error("AsyncStorage error"));

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId("loading").props.children).toBe("Not Loading");
      expect(getByTestId("user").props.children).toBe("No User");
      expect(getByTestId("error").props.children).toBe("Error");
    });

    expect(mockGetItem).toHaveBeenCalledWith("AUTH");
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
    expect(firestore().collection).not.toHaveBeenCalled();
    expect(mockSetItem).not.toHaveBeenCalled();
  });
});

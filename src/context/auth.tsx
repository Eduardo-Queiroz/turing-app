import React, { createContext, useState, useEffect, ReactNode } from "react";
import auth from "@react-native-firebase/auth";
import { userGenerator, USERS_COLLECTION_NAME } from "@turing-app/utils";
import firestore from "@react-native-firebase/firestore";
import { User } from "@turing-app/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  error: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = "AUTH";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const signInAnonymously = async () => {
    try {
      const { user: firebaseUser } = await auth().signInAnonymously();
      if (firebaseUser) {
        const { name, avatar } = userGenerator();
        const newUser: User = {
          id: firebaseUser.uid,
          name,
          imageUrl: avatar,
          metadata: {},
        };

        await firestore()
          .collection(USERS_COLLECTION_NAME)
          .doc(firebaseUser.uid)
          .set({
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
            ...newUser,
          });

        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        await signInAnonymously();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

import { BoxCore, SafeAreaCore } from "@turing-app/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import { useRooms, useTypedNavigation } from "@turing-app/hooks";
import {
  HomeEmptyContainer,
  HomeHeaderContainer,
  HomeLoadingContainer,
  HomeMessageContainer,
} from "../container";
import { ErrorComponent } from "@turing-app/components";

export const HomeScreen = () => {
  const { createRoom, rooms, error, retry, loading, createRoomLoading } =
    useRooms();
  const navigation = useTypedNavigation();

  if (error) {
    return <ErrorComponent retry={retry} />;
  }

  const handleCreateRoom = async () => {
    const currentRoom = await createRoom();
    if (!!currentRoom) navigation.navigate("Message", { room: currentRoom });
  };

  return (
    <SafeAreaCore>
      <HomeHeaderContainer
        createRoom={handleCreateRoom}
        loadingCreateRoom={createRoomLoading}
      />
      {loading ? (
        <HomeLoadingContainer />
      ) : (
        <BoxCore paddingHorizontal="xl" marginTop="xxl">
          <FlatList
            ListEmptyComponent={HomeEmptyContainer}
            data={rooms}
            keyExtractor={(room) => room.id}
            renderItem={({ item: room }) => (
              <HomeMessageContainer
                isUnreaded={!!room.unread}
                id={room.id}
                name={room.otherUser.name}
                message={room.lastMessage}
                imageUri={room.otherUser.imageUrl}
                onPress={() => {
                  navigation.navigate("Message", { room });
                }}
              />
            )}
          />
        </BoxCore>
      )}
    </SafeAreaCore>
  );
};

import { BoxCore } from "@turing-app/core";
import { StatusBar } from "expo-status-bar";
import { Header } from "@turing-app/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatComponent } from "@turing-app/components/chat";
import { useRoute } from "@react-navigation/native";
import { useMessage, useTypedNavigation } from "@turing-app/hooks";
import { MessageLoadingContainer } from "../containers/loading";
import { ErrorComponent } from "@turing-app/components";
import { MessageRouteParams } from "@turing-app/types";

export const MessageScreen = () => {
  const { params } = useRoute<MessageRouteParams>();
  const navigation = useTypedNavigation();
  const {
    retry,
    error,
    loading,
    messages,
    handleSendText,
    handleSendImage,
    otherUserName,
    flyerhqUser,
    handleLikeMessage,
  } = useMessage(params?.room);

  const handleImageSelection = () => {
    navigation.navigate("Camera", { onSave: handleSendImage });
  };

  if (error) {
    return <ErrorComponent retry={retry} />;
  }

  return (
    <BoxCore backgroundColor="surface" flex={1}>
      <StatusBar style="light" />
      <SafeAreaView>
        <Header
          title={otherUserName}
          rightIcon="arrow-back"
          rightAction={navigation.goBack}
        />
      </SafeAreaView>

      {loading && <MessageLoadingContainer />}

      <ChatComponent
        messages={messages}
        onSendPress={handleSendText}
        onLikeMessage={handleLikeMessage}
        user={flyerhqUser}
        onAttachmentPress={handleImageSelection}
      />
    </BoxCore>
  );
};

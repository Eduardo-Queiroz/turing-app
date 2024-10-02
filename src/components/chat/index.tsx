import { Chat, defaultTheme, MessageType } from "@flyerhq/react-native-chat-ui";
import { ChatBubbleComponent } from "./bubble";
import { ChatTextInputComponent } from "./text-input";
import { useTheme } from "@turing-app/hooks";
import { KeyboardAvoidingView, Platform } from "react-native";

type ChatComponentProps = React.ComponentProps<typeof Chat> & {
  onLikeMessage: (message: MessageType.Any) => void;
};

export const ChatComponent = ({
  onLikeMessage,
  ...chatProps
}: ChatComponentProps) => {
  const { colors } = useTheme();

  const chatTheme = {
    ...defaultTheme,
    fonts: {
      ...defaultTheme.fonts,
      dateDividerTextStyle: {
        ...defaultTheme.fonts.dateDividerTextStyle,
        color: colors.neutral50,
      },
      sentMessageBodyTextStyle: {
        ...defaultTheme.fonts.sentMessageBodyTextStyle,
        color: colors.onSurfaceContainer,
      },
      receivedMessageBodyTextStyle: {
        ...defaultTheme.fonts.sentMessageBodyTextStyle,
        color: colors.onSurfaceContainerVariant,
      },
    },
    colors: {
      ...defaultTheme.colors,
      background: colors.surface,
      inputText: colors.secondary,
      inputBackground: colors.surfaceVariant,
      primary: colors.surfaceContainer,
      secondary: colors.surfaceContainer,
    },
  };

  const chatComponent = () => (
    <Chat
      theme={chatTheme}
      emptyState={() => <></>}
      renderBubble={(props) => (
        <ChatBubbleComponent onLikeMessage={onLikeMessage} {...props} />
      )}
      customBottomComponent={() => (
        <ChatTextInputComponent
          placeholder="Message"
          onSend={chatProps.onSendPress}
          onAttachmentPress={chatProps.onAttachmentPress}
        />
      )}
      {...chatProps}
    />
  );

  if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        {chatComponent()}
      </KeyboardAvoidingView>
    );
  }
  return chatComponent();
};

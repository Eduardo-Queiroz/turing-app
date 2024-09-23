import { Chat, defaultTheme } from "@flyerhq/react-native-chat-ui";
import { ChatBubbleComponent } from "./bubble";
import { ChatTextInputComponent } from "./text-input";
import { useTheme } from "@turing-app/hooks";
import { KeyboardAvoidingView, Platform } from "react-native";

type ChatComponentProps = React.ComponentProps<typeof Chat>;

export const ChatComponent = ({ ...chatProps }: ChatComponentProps) => {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Chat
        theme={chatTheme}
        emptyState={() => <></>}
        enableAnimation={true}
        renderBubble={ChatBubbleComponent}
        customBottomComponent={() => (
          <ChatTextInputComponent
            placeholder="Message"
            onSend={chatProps.onSendPress}
            onAttachmentPress={chatProps.onAttachmentPress}
          />
        )}
        {...chatProps}
      />
    </KeyboardAvoidingView>
  );
};

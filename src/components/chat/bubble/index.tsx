import { MaterialIcons } from "@expo/vector-icons";
import { BoxCore } from "../../../core";
import { MessageType } from "@flyerhq/react-native-chat-ui";
import { useAuth, useTheme } from "@turing-app/hooks";

export type IconNameType = React.ComponentProps<typeof MaterialIcons>["name"];

export type ChatBubbleComponentProps = {
  child: React.ReactNode;
  message: MessageType.Any;
  nextMessageInGroup: boolean;
};

export const ChatBubbleComponent: React.FC<ChatBubbleComponentProps> = ({
  child,
  message,
  nextMessageInGroup,
}) => {
  const { user } = useAuth();
  const { shadowVariants } = useTheme();
  const shadowEasy = shadowVariants["easy"];
  const userIsAuthor = user?.id === message.author.id;
  const isImage = message.type == "image";

  return (
    <BoxCore
      key={message.id}
      overflow={isImage ? "hidden" : "visible"}
      backgroundColor={
        userIsAuthor ? "surfaceContainer" : "surfaceContainerVariant"
      }
      borderRadius="pill"
      borderBottomLeftRadius={
        nextMessageInGroup || userIsAuthor ? "pill" : "none"
      }
      borderBottomRightRadius={
        nextMessageInGroup || !userIsAuthor ? "pill" : "none"
      }
      shadowColor={!userIsAuthor ? "primary" : "surface"}
      {...shadowEasy}
    >
      {child}
    </BoxCore>
  );
};

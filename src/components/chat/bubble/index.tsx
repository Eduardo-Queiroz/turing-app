import { MaterialIcons } from "@expo/vector-icons";
import { BoxCore, IconCore } from "../../../core";
import { MessageType } from "@flyerhq/react-native-chat-ui";
import { useAuth, useTheme } from "@turing-app/hooks";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export type IconNameType = React.ComponentProps<typeof MaterialIcons>["name"];

export type ChatBubbleComponentProps = {
  child: React.ReactNode;
  message: MessageType.Any;
  nextMessageInGroup: boolean;
  onLikeMessage: (message: MessageType.Any) => void;
};

export const ChatBubbleComponent: React.FC<ChatBubbleComponentProps> = ({
  child,
  message,
  nextMessageInGroup,
  onLikeMessage,
}) => {
  const { user } = useAuth();
  const { shadowVariants } = useTheme();
  const shadowEasy = shadowVariants["easy"];
  const userIsAuthor = user?.id === message.author.id;
  const isImage = message.type == "image";
  const isLiked = message.metadata?.liked;
  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (!isLiked) runOnJS(onLikeMessage)(message);
    });
  return (
    <BoxCore>
      <GestureDetector gesture={tap}>
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
      </GestureDetector>
      {isLiked && (
        <BoxCore bottom={12}>
          <IconCore name="favorite" color="danger" />
        </BoxCore>
      )}
    </BoxCore>
  );
};

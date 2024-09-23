import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, TextInputProps } from "react-native";
import { BoxCore, IconCore } from "../../../core";
import { MessageType } from "@flyerhq/react-native-chat-ui";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { IconButtonComponent } from "@turing-app/components/icon-button";
import { useTheme } from "@turing-app/hooks";
import * as Haptics from "expo-haptics";

export type IconNameType = React.ComponentProps<typeof MaterialIcons>["name"];

export type ChatTextInputComponentProps = {
  onAttachmentPress?: () => void;
  onSend: (message: MessageType.PartialText) => void;
} & TextInputProps;

export const ChatTextInputComponent: React.FC<ChatTextInputComponentProps> = ({
  onSend,
  onAttachmentPress,
  ...textInputProps
}) => {
  const { colors, spacing, textVariants } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const [text, setText] = useState("");

  const handleChangeText = (newText: string) => {
    setText(newText);
  };
  const handleSendText = () => {
    if (text.trim().length > 0) {
      Haptics.impactAsync();
      onSend({ text, type: "text" });
      setText("");
    }
  };
  return (
    <BoxCore marginTop="l">
      <BoxCore flexDirection="row" backgroundColor="surfaceVariant">
        <BoxCore marginTop="m">
          <IconButtonComponent
            name="camera-alt"
            onPress={() => {
              if (!!onAttachmentPress) onAttachmentPress();
            }}
          />
        </BoxCore>
        <BoxCore flex={1}>
          <TextInput
            autoFocus
            underlineColorAndroid="transparent"
            cursorColor={colors.secondary}
            placeholderTextColor={colors.neutral50}
            style={{
              fontFamily: textVariants.body.fontFamily,
              fontSize: textVariants.subtitle.fontSize,
              color: colors.secondary,
              paddingTop: spacing.l,
              paddingBottom: bottom || spacing.xl,
            }}
            onChangeText={handleChangeText}
            value={text}
            {...textInputProps}
          />
        </BoxCore>
        <BoxCore right={20} bottom={35} position="absolute">
          <TouchableOpacity onPress={handleSendText}>
            <BoxCore
              borderRadius="circular"
              padding="xl"
              backgroundColor="primary"
              justifyContent="center"
              alignItems="center"
            >
              <IconCore name="arrow-upward" color="onSurfaceContainer" />
            </BoxCore>
          </TouchableOpacity>
        </BoxCore>
      </BoxCore>
    </BoxCore>
  );
};

import { BoxCore, TextCore, CircleCore } from "@turing-app/core";
import { AvatarComponent } from "@turing-app/components/avatar";
import { TouchableOpacity } from "react-native";
export const HomeMessageContainer = ({
  id,
  name,
  message = "Start a conversation",
  imageUri,
  isUnreaded,
  onPress,
}: {
  name: string;
  message?: string;
  imageUri: string;
  id: string;
  isUnreaded: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BoxCore flexDirection="row" paddingBottom="xxl">
        <AvatarComponent
          cacheKey={id}
          name={name}
          uri={imageUri}
          variant="medium"
        />
        <BoxCore flex={1} paddingLeft="l">
          <BoxCore
            flexDirection="row"
            marginBottom="s"
            justifyContent="space-between"
            paddingTop="s"
          >
            <TextCore variant="subtitle" color="primary">
              {name}
            </TextCore>
            {isUnreaded && (
              <CircleCore
                marginRight="xl"
                backgroundColor="primary"
                variant="small"
              />
            )}
          </BoxCore>
          <TextCore
            variant={isUnreaded ? "bodyBold" : "body"}
            color={isUnreaded ? "neutral150" : "neutral100"}
            numberOfLines={2}
          >
            {message}
          </TextCore>
        </BoxCore>
      </BoxCore>
    </TouchableOpacity>
  );
};

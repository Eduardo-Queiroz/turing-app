import { Header } from "@turing-app/components/header";
import { useColorSchema } from "@turing-app/hooks";
import switchTheme from "react-native-theme-switch-animation";

type HomeHeaderContainerProps = {
  createRoom: () => void;
  loadingCreateRoom: boolean;
};

export const HomeHeaderContainer = ({
  createRoom,
  loadingCreateRoom,
}: HomeHeaderContainerProps) => {
  const { toggleColorScheme, colorScheme } = useColorSchema();
  return (
    <Header
      title="messages"
      rightIcon={colorScheme == "light" ? "sunny" : "nightlight"}
      rightAction={() => {
        switchTheme({
          switchThemeFunction: toggleColorScheme,
          animationConfig: {
            type: "circular",
            duration: 900,
            startingPoint: {
              cxRatio: 0.1,
              cyRatio: 0.1,
            },
          },
        });
      }}
      leftIcon="edit"
      leftAction={() => createRoom()}
      leftLoading={loadingCreateRoom}
    />
  );
};

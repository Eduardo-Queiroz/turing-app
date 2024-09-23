import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { HomeScreen } from "./src/modules/home/screens";

import { MessageScreen } from "@turing-app/modules/message/screens";
import { useAssets } from "@turing-app/hooks/assets";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraScreen } from "@turing-app/modules/camera/screens";

import { AuthProvider, ThemeProvider } from "@turing-app/context";
import { composeProviders } from "@turing-app/utils";
import { useAuth } from "@turing-app/hooks";
import { useEffect } from "react";
import { ErrorScreen } from "@turing-app/modules/error/screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastComponent } from "@turing-app/components";
import { BoxCore } from "@turing-app/core";

//configs
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const AppProviders = composeProviders(
  GestureHandlerRootView,
  ThemeProvider,
  AuthProvider,
  SafeAreaProvider
);

const App = () => {
  const { loading: loadingAssets, error: errorAssets } = useAssets();
  const { loading: loadingAuth, error: errorAuth } = useAuth();

  useEffect(() => {
    if (!loadingAuth && !loadingAssets) {
      SplashScreen.hideAsync();
    }
  }, [loadingAssets, loadingAuth]);

  if (errorAssets || errorAuth) {
    return <ErrorScreen />;
  }

  return (
    <BoxCore backgroundColor="surface" flex={1}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastComponent />
    </BoxCore>
  );
};

export default () => (
  <AppProviders>
    <App />
  </AppProviders>
);

import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Main from "./components/Main";
import { store, persistor } from "./redux/store";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          RobotoBold: require("./fonts/roboto_bold.ttf"),
          RobotoMonoBold: require("./fonts/roboto_mono_bold.ttf"),
          RobotoMonoRegular: require("./fonts/roboto_mono_regular.ttf"),
          RobotoRegular: require("./fonts/roboto_regular.ttf"),
          RubikBold: require("./fonts/rubik_bold.ttf"),
          RubikRegular: require("./fonts/rubik_regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </View>
  );
}

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Poppins } from "./assets/fonts";
import { colorSchemes } from "./utils/_variables";
import { blackColor, whiteColor } from "./assets/colors";
import Providers from "./components/_layouts/Providers";
import ScreenStacks from "./components/_layouts/ScreenStacks";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    [Poppins.regular
      .default]: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    [Poppins.regular
      .italics]: require("@/assets/fonts/Poppins/Poppins-Italic.ttf"),
    [Poppins.bold.default]: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
    [Poppins.bold
      .italics]: require("@/assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
    [Poppins.semiBold
      .default]: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    [Poppins.semiBold
      .italics]: require("@/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
    [Poppins.medium
      .default]: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
    [Poppins.medium
      .italics]: require("@/assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
    [Poppins.black
      .default]: require("@/assets/fonts/Poppins/Poppins-Black.ttf"),
    [Poppins.black
      .italics]: require("@/assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
    [Poppins.extraBold
      .default]: require("@/assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    [Poppins.extraBold
      .italics]: require("@/assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf")
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1
        }}
      >
        {fontsLoaded && (
          <Providers>
            <StatusBar style={"light"} backgroundColor="transparent" />
            <ScreenStacks fontLoaded={fontsLoaded} />
          </Providers>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

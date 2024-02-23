import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { ScreenStackType } from "@/utils/types";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useActionContext } from "@/context";
import { ScreenNames } from "@/utils/_variables";
import { whiteColor } from "@/assets/colors";
import GettingStarted from "@/screens/GettingStarted";
import Login from "@/screens/Login";
import Register from "@/screens/Register";
import Dashboard from "@/screens/Dashboard";
import Projects from "@/screens/Projects";
import Assets from "../../screens/Assets";
import Wallet from "../../screens/Wallet";
import Profile from "../../screens/Profile";

const Stack = createNativeStackNavigator<any>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: whiteColor.default
  }
};

const ScreenStacks: React.FC<ScreenStackType> = ({ fontLoaded }) => {
  const { getColorScheme } = useActionContext();
  const showAppScreens = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  useEffect(() => {
    getColorScheme();
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      showAppScreens();
    }
  }, [fontLoaded]);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={ScreenNames.Dashboard.name}>
        {/*screens that shows when user isn't loggedin yet */}
        <Stack.Group
          screenOptions={{
            animation: "slide_from_right",
            headerShown: false,
            gestureEnabled: true
          }}
        >
          <Stack.Screen
            name={ScreenNames.GettingStarted.name}
            component={GettingStarted}
          />
          <Stack.Screen name={ScreenNames.Login.name} component={Login} />
          <Stack.Screen name={ScreenNames.Register.name} component={Register} />
        </Stack.Group>
        {/* Screens when users are loggedin */}
        <Stack.Group
          screenOptions={{
            animation: "fade_from_bottom",
            headerShown: false,
            gestureEnabled: true
          }}
        >
          <Stack.Screen
            name={ScreenNames.Dashboard.name}
            component={Dashboard}
          />
          <Stack.Screen name={ScreenNames.Projects.name} component={Projects} />
          <Stack.Screen name={ScreenNames.Assets.name} component={Assets} />
          <Stack.Screen name={ScreenNames.Wallet.name} component={Wallet} />
          <Stack.Screen name={ScreenNames.Profile.name} component={Profile} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenStacks;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { ScreenStackType } from "@/utils/types";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useActionContext, useUserContext } from "@/context";
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
import TransactionDetails from "@/screens/TransactionDetails";
import ProfileDetails from "@/screens/ProfileDetails";
import BankDetails from "@/screens/BankDetails";
import ChangePassword from "../../screens/ChangePassword";
import Referrals from "../../screens/Referrals";
import Deposit from "@/screens/Deposit";
import Withdraw from "@/screens/Withdraw";
import Transfer from "@/screens/Transfer";
import ConfirmTransfer from "@/screens/ConfirmTransfer";
import ConfirmDeposit from "@/screens/ConfirmDeposit";
import ConfirmWithdraw from "@/screens/ConfirmWithdraw";
import Chats from "@/screens/Chats";
import ChatDetails from "@/screens/ChatDetails";
import ProjectDetails from "@/screens/ProjectDetails";
import AssetDetails from "@/screens/AssetDetails";
import { getUserToken } from "@/localServices/function";
import { setHeaderAuthorization } from "@/api";
import Moment from "moment";
import useUser from "@/hooks/useUser";

const Stack = createNativeStackNavigator<any>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: whiteColor.default
  }
};

const ScreenStacks: React.FC<ScreenStackType> = ({ fontLoaded }) => {
  Moment.locale("en");
  const { setColorScheme, appLoaded, setAppLoaded } = useActionContext();
  const { token, setToken } = useUserContext();
  const { fetchUserDetails } = useUser();
  const showAppScreens = useCallback(async () => {
    if (fontLoaded && appLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded, appLoaded]);

  const loadApp = useCallback(async () => {
    setColorScheme();
    const token = await getUserToken();
    if (token) {
      setToken(token);
      setHeaderAuthorization(token);
      fetchUserDetails();
    }
    setAppLoaded();
  }, [setAppLoaded, setToken]);

  useEffect(() => {
    loadApp();
  }, []);

  useEffect(() => {
    if (fontLoaded && appLoaded) {
      showAppScreens();
    }
  }, [fontLoaded, appLoaded]);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={
          token ? ScreenNames.Dashboard.name : ScreenNames.GettingStarted.name
        }
      >
        {/*screens that shows when user isn't loggedin yet */}
        {!token && (
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
            <Stack.Screen
              name={ScreenNames.Register.name}
              component={Register}
            />
          </Stack.Group>
        )}
        {/* Screens when users are loggedin */}

        {token && (
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
            <Stack.Screen
              name={ScreenNames.Projects.name}
              component={Projects}
            />
            <Stack.Screen name={ScreenNames.Assets.name} component={Assets} />
            <Stack.Screen name={ScreenNames.Wallet.name} component={Wallet} />
            <Stack.Screen
              name={ScreenNames.Referrals.name}
              component={Referrals}
            />

            <Stack.Group
              screenOptions={{
                animation: "slide_from_right",
                headerShown: false,
                gestureEnabled: true
              }}
            >
              <Stack.Screen
                name={ScreenNames.Profile.name}
                component={Profile}
              />
              <Stack.Screen name={ScreenNames.Chats.name} component={Chats} />
              <Stack.Screen
                name={ScreenNames.ChatDetails.name}
                component={ChatDetails}
              />
              <Stack.Screen
                name={ScreenNames.Deposit.name}
                component={Deposit}
              />
              <Stack.Screen
                name={ScreenNames.Withdraw.name}
                component={Withdraw}
              />
              <Stack.Screen
                name={ScreenNames.Transfer.name}
                component={Transfer}
              />
              <Stack.Screen
                name={ScreenNames.ProjectDetails.name}
                component={ProjectDetails}
              />
              <Stack.Screen
                name={ScreenNames.AssetDetails.name}
                component={AssetDetails}
              />
              <Stack.Screen
                name={ScreenNames.TransactionDetails.name}
                component={TransactionDetails}
              />
              <Stack.Screen
                name={ScreenNames.ProfileDetails.name}
                component={ProfileDetails}
              />
              <Stack.Screen
                name={ScreenNames.BankDetails.name}
                component={BankDetails}
              />
              <Stack.Screen
                name={ScreenNames.ChangePassword.name}
                component={ChangePassword}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                animation: "fade",
                headerShown: false,
                gestureEnabled: true,
                presentation: "transparentModal"
              }}
            >
              <Stack.Screen
                name={ScreenNames.TransferConfirmation.name}
                component={ConfirmTransfer}
              />
              <Stack.Screen
                name={ScreenNames.DepositConfirmation.name}
                component={ConfirmDeposit}
              />
              <Stack.Screen
                name={ScreenNames.WithdrawConfirmation.name}
                component={ConfirmWithdraw}
              />
            </Stack.Group>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenStacks;

const styles = StyleSheet.create({});

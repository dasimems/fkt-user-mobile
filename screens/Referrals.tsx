import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import TextComponent from "@/components/_general/TextComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNames } from "@/utils/_variables";
import LinearReferrals from "./inner-screens/LinearReferrals";
import AssistReferrals from "./inner-screens/AssistReferrals";
import ReferralContainer from "@/components/_layouts/ReferralContainer";

const Stack = createNativeStackNavigator<any>();

const Referrals = () => {
  return (
    <LoggedInContainer
      unScrollable
      headerText="Community"
      contentContainerStyle={{
        paddingTop: 0,
        flex: 1,
        overflow: "hidden"
      }}
    >
      <ReferralContainer>
        <Stack.Navigator initialRouteName={ScreenNames.LinearReferrals.name}>
          <Stack.Group
            screenOptions={{
              animation: "slide_from_right",
              headerShown: false,
              gestureEnabled: true
            }}
          >
            <Stack.Screen
              name={ScreenNames.LinearReferrals.name}
              component={LinearReferrals}
            />
            <Stack.Screen
              name={ScreenNames.AssistReferrals.name}
              component={AssistReferrals}
            />
          </Stack.Group>
        </Stack.Navigator>
      </ReferralContainer>
    </LoggedInContainer>
  );
};

export default Referrals;

const styles = StyleSheet.create({});

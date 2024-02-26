import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  blackColor,
  primaryColor,
  redColor,
  whiteColor
} from "@/assets/colors";
import { ArrowLeftRight, Landmark } from "lucide-react-native";
import {
  ScreenNames,
  defaultIconProps,
  colorSchemes
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { useNavigation } from "@react-navigation/native";
import { useActionContext } from "@/context";

const WalletActions = () => {
  const { navigate } = useNavigation();
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigate(ScreenNames.Transfer.name as never);
        }}
        style={{
          ...styles.buttonStyle,
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity200
        }}
      >
        <ArrowLeftRight
          {...defaultIconProps}
          color={
            colorScheme === colorSchemes.dark
              ? whiteColor.default
              : blackColor.default
          }
        />
        <TextComponent>Transfer</TextComponent>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate(ScreenNames.Deposit.name as never);
        }}
        style={{
          ...styles.buttonStyle,
          backgroundColor: redColor.opacity600
        }}
      >
        <ArrowLeftRight {...defaultIconProps} color={whiteColor.default} />
        <TextComponent color={whiteColor.default}>Deposit</TextComponent>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate(ScreenNames.Withdraw.name as never);
        }}
        style={{
          ...styles.buttonStyle,
          backgroundColor: primaryColor.default
        }}
      >
        <Landmark {...defaultIconProps} color={whiteColor.default} />
        <TextComponent color={whiteColor.default}>Withdraw</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default WalletActions;

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  }
});

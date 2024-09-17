import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useActionContext, useUserContext } from "@/context";
import {
  colorSchemes,
  defaultIconProps,
  ScreenNames
} from "@/utils/_variables";
import { blackColor, redColor, whiteColor } from "@/assets/colors";
import { MailIcon, Smartphone } from "lucide-react-native";
import TextComponent from "@/components/_general/TextComponent";
import { useNavigation } from "@react-navigation/native";
import VerifyEmail from "@/screens/VerifyEmail";

const VerifyAccount = () => {
  const { colorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  const { navigate } = useNavigation();
  const splittedEmail = userDetails?.email?.split("@") || [];
  if (!userDetails?.email_verified) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(ScreenNames.VerifyEmail.name as never);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? redColor.opacity100
              : redColor.opacity100,
          borderRadius: 90000,
          padding: 10,
          paddingRight: 20,
          gap: 10
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? redColor.opacity100
                : redColor.opacity100,
            borderRadius: 90000
          }}
        >
          <MailIcon
            {...defaultIconProps}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.default
                : redColor.default
            }
          />
        </View>
        <View
          style={{
            flex: 1
          }}
        >
          <TextComponent color={redColor.default}>
            Please verify your email
          </TextComponent>
          <TextComponent
            fontSize={10}
            style={{
              opacity: 0.6
            }}
          >
            Click to verify ({splittedEmail[0]?.slice(0, 2)}****
            {splittedEmail[0]?.slice(splittedEmail[0]?.length - 1)}@
            {splittedEmail[1]})
          </TextComponent>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(ScreenNames.VerifyPhone.name as never);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? redColor.opacity100
            : redColor.opacity100,
        borderRadius: 90000,
        padding: 10,
        paddingRight: 20,
        gap: 10
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? redColor.opacity100
              : redColor.opacity100,
          borderRadius: 90000
        }}
      >
        <Smartphone
          {...defaultIconProps}
          color={
            colorScheme === colorSchemes.dark
              ? whiteColor.default
              : redColor.default
          }
        />
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent color={redColor.default}>
          Please verify your mobile number
        </TextComponent>
        <TextComponent
          fontSize={10}
          style={{
            opacity: 0.6
          }}
        >
          Click to verify ({userDetails?.phone?.slice(0, 4)}****
          {userDetails?.phone?.slice(userDetails?.phone?.length - 4)})
        </TextComponent>
      </View>
    </TouchableOpacity>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({});

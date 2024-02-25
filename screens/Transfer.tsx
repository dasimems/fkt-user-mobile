import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import { whiteColor } from "@/assets/colors";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "@/utils/_variables";

const Transfer = () => {
  const { navigate } = useNavigation();
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 20,
        minHeight: "100%"
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 20
        }}
      >
        <InputField
          label="Email"
          inputMode="email"
          keyboardType="email-address"
          placeholder="E.g example@example.com"
        />
        <InputField
          label="Amount"
          inputMode="numeric"
          keyboardType="number-pad"
          placeholder="Input amount"
        />
        <InputField
          label="Note"
          placeholder="Input amount"
          multiline
          inputStyle={{
            height: 100,
            textAlignVertical: "top"
          }}
        />
      </View>
      <Button
        action={() => {
          navigate(ScreenNames.TransferConfirmation.name as never);
        }}
        type="primary"
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Transfer</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default Transfer;

const styles = StyleSheet.create({});

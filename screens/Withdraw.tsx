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

const Withdraw = () => {
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
          inputMode="numeric"
          keyboardType="number-pad"
          placeholder="Input amount"
          label="Amount"
        />
        <InputField
          label="Note"
          placeholder="E.g My balance withdrawal"
          multiline
          inputStyle={{
            height: 100,
            textAlignVertical: "top"
          }}
        />
      </View>
      <Button
        action={() => {
          navigate(ScreenNames.WithdrawConfirmation.name as never);
        }}
        type="primary"
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Withdraw</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});

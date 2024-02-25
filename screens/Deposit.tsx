import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import { whiteColor } from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "@/utils/_variables";

const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [depositAmountErr, setDepositAmountErr] = useState("");
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
          flex: 1
        }}
      >
        <InputField
          inputMode="numeric"
          keyboardType="number-pad"
          label="Amount"
          value={depositAmount || "0"}
          onChangeText={(value) => {
            setDepositAmount(value);
            setDepositAmountErr("");
          }}
          error={depositAmountErr}
        />
      </View>
      <Button
        action={() => {
          navigate(ScreenNames.DepositConfirmation.name as never);
        }}
        type="primary"
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Deposit</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default Deposit;

const styles = StyleSheet.create({});

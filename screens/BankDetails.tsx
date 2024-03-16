import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../assets/colors";
import { useUserContext } from "@/context";

const BankDetails = () => {
  const { userDetails } = useUserContext();
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 20,
        minHeight: "100%"
      }}
    >
      <View style={{ flex: 1, gap: 20 }}>
        <InputField
          label="Bank name"
          placeholder="E.g Central Bank Of Africa"
        />
        <InputField
          label="Account number"
          inputMode="numeric"
          keyboardType="number-pad"
          placeholder="E.g 1234567890"
        />
        <InputField label="Account name" placeholder="E.g John Doe" />
      </View>
      <Button type="primary">
        <TextComponent textAlign="center" color={whiteColor.default}>
          Update Bank
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default BankDetails;

const styles = StyleSheet.create({});

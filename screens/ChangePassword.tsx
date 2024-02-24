import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../assets/colors";

const ChangePassword = () => {
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
          label="Old password"
          secureTextEntry
          placeholder="Old password"
        />
        <InputField
          label="New password"
          secureTextEntry
          placeholder="New password"
        />
        <InputField
          label="Repeat password"
          secureTextEntry
          placeholder="Repeat password"
        />
      </View>
      <Button type="primary">
        <TextComponent textAlign="center" color={whiteColor.default}>
          Update password
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});

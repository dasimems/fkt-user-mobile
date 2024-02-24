import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../assets/colors";

const ProfileDetails = () => {
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
        <InputField label="Name" placeholder="E.g John Doe" />
        <InputField
          label="Email"
          inputMode="email"
          keyboardType="email-address"
          placeholder="E.g example@example.com"
        />
        <InputField
          inputMode="tel"
          keyboardType="number-pad"
          label="Phone number"
          placeholder="E.g +(256) 903-663-4645"
        />
      </View>
      <Button type="primary">
        <TextComponent textAlign="center" color={whiteColor.default}>
          Update profile
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});

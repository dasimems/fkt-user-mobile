import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const ConfirmWithdraw = () => {
  return (
    <ModalLayout hideHeader continueActionText="Yes, Proceed">
      <TextComponent textAlign="center">
        Are you sure you want to withdraw the sum of{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>$30</TextComponent>{" "}
        from your account
      </TextComponent>
    </ModalLayout>
  );
};

export default ConfirmWithdraw;

const styles = StyleSheet.create({});

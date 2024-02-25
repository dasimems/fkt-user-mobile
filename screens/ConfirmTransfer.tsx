import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const ConfirmTransfer = () => {
  return (
    <ModalLayout hideHeader continueActionText="Yes, Proceed">
      <TextComponent textAlign="center">
        Are you sure you want to transfer the sum of{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>$30</TextComponent>{" "}
        to{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>
          isaacseun63@gmail.com
        </TextComponent>
      </TextComponent>
    </ModalLayout>
  );
};

export default ConfirmTransfer;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { useRoute } from "@react-navigation/native";
import { Poppins } from "@/assets/fonts";

const ConfirmDeposit = () => {
  const { params }: { params?: { price?: string } } = useRoute();
  return (
    <ModalLayout hideHeader continueActionText="Continue">
      <TextComponent textAlign="center">
        You will be redirected to a website to complete your deposit of{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {params?.price}
        </TextComponent>
      </TextComponent>
    </ModalLayout>
  );
};

export default ConfirmDeposit;

const styles = StyleSheet.create({});

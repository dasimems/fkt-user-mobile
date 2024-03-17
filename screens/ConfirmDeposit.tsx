import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Poppins } from "@/assets/fonts";
import { ScreenNames } from "@/utils/_variables";

const ConfirmDeposit = () => {
  const { params }: { params?: { amount?: string } } = useRoute();
  const { navigate } = useNavigation();
  return (
    <ModalLayout
      hideHeader
      continueActionText="Continue"
      action={() => {
        navigate({
          name: ScreenNames.Deposit.name,
          params: {
            proceed: true
          }
        } as never);
      }}
    >
      <TextComponent textAlign="center">
        You will be redirected to a website to complete your deposit of{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>
          ${params?.amount}
        </TextComponent>
      </TextComponent>
    </ModalLayout>
  );
};

export default ConfirmDeposit;

const styles = StyleSheet.create({});

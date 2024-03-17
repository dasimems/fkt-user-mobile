import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNames } from "@/utils/_variables";

const ConfirmWithdraw = () => {
  const { params }: { params?: { amount?: string } } = useRoute();
  const { navigate } = useNavigation();
  return (
    <ModalLayout
      hideHeader
      continueActionText="Yes, Proceed"
      action={() => {
        navigate({
          name: ScreenNames.Withdraw.name,
          params: {
            proceed: true
          }
        } as never);
      }}
    >
      <TextComponent textAlign="center">
        Are you sure you want to withdraw the sum of{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>
          ${params?.amount}
        </TextComponent>{" "}
        from your account
      </TextComponent>
    </ModalLayout>
  );
};

export default ConfirmWithdraw;

const styles = StyleSheet.create({});

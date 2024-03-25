import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalLayout from "@/components/_layouts/ModalLayout";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNames } from "@/utils/_variables";
import InputField from "@/components/_general/form/InputField";
import { showToast } from "@/utils/functions";

const ConfirmTransfer = () => {
  const { params }: { params?: { amount?: string; email?: string } } =
    useRoute();
  const { navigate } = useNavigation();
  const [password, setPassword] = useState("");
  return (
    <ModalLayout
      hideHeader
      continueActionText="Yes, Proceed"
      action={() => {
        if (password) {
          navigate({
            name: ScreenNames.Transfer.name,
            params: {
              proceed: true,
              password
            }
          } as never);
        } else {
          showToast("Please input your password");
        }
      }}
    >
      <TextComponent textAlign="center">
        Are you sure you want to transfer the sum of{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>
          ${params?.amount}
        </TextComponent>{" "}
        to{" "}
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {params?.email}
        </TextComponent>
      </TextComponent>
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        Please input your password to continue
      </TextComponent>
      <InputField
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={(password) => {
          setPassword(password);
        }}
      />
    </ModalLayout>
  );
};

export default ConfirmTransfer;

const styles = StyleSheet.create({});

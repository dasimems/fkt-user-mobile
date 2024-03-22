import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../assets/colors";
import { useUserContext } from "@/context";
import { useNavigation } from "@react-navigation/native";
import useUser from "@/hooks/useUser";
import { UpdateBankDetailsBodyType } from "@/api/index.d";
import { showToast, validateValues } from "@/localServices/function";
import { processRequest } from "@/api/functions";
import { generalError } from "@/utils/_variables";
import { updateUserDetailsApi } from "@/api/url";

const BankDetails = () => {
  const { userDetails } = useUserContext();
  const { goBack } = useNavigation();
  const { fetchUserDetails } = useUser();
  const initialValue: UpdateBankDetailsBodyType = useMemo(
    () => ({
      account_bank: userDetails?.account?.bank || "",
      account_name: userDetails?.account?.name || "",
      account_number: userDetails?.account?.number || ""
    }),
    [userDetails]
  );
  const [formDetails, setFormDetails] = useState(initialValue);
  const [formDetailsErr, setFormDetailsErr] = useState({
    ...initialValue,
    account_bank: "",
    account_name: "",
    account_number: ""
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const updateBank = useCallback(() => {
    const errors = validateValues(formDetails, {
      account_bank: true as any,
      account_name: true as any,
      account_number: true as any
    });

    if (errors) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      setLoading(true);
      processRequest(updateUserDetailsApi, formDetails)
        .then((res) => {
          showToast("Bank details updated successfully");
          goBack();
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
          const errors = err?.response?.errors;
          let error = {};

          if (errors) {
            if (errors?.account_bank) {
              error = {
                ...error,
                account_bank: errors?.account_bank
              };
            }
            if (errors?.account_name) {
              error = {
                ...error,
                account_name: errors?.account_name
              };
            }
            if (errors?.account_number) {
              error = {
                ...error,
                account_number: errors?.account_number
              };
            }
          }
          setFormDetailsErr((prevState) => ({
            ...prevState,
            ...error
          }));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [formDetails]);

  useEffect(() => {
    const { account_bank, account_name, account_number } = formDetails;
    const {
      account_bank: initialAccountBank,
      account_name: initialAccountName,
      account_number: initialAccountNumber
    } = initialValue;

    if (
      (account_bank && account_bank !== initialAccountBank) ||
      (account_name && account_name !== initialAccountName) ||
      (account_number && account_number !== initialAccountNumber)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formDetails]);
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
          value={formDetails.account_bank}
          error={formDetailsErr.account_bank}
          onChangeText={(account_bank) => {
            setFormDetails((prevState) => ({
              ...prevState,
              account_bank
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              account_bank: ""
            }));
          }}
        />
        <InputField
          label="Account number"
          inputMode="numeric"
          keyboardType="number-pad"
          placeholder="E.g 1234567890"
          value={formDetails.account_number}
          error={formDetailsErr.account_number}
          onChangeText={(account_number) => {
            setFormDetails((prevState) => ({
              ...prevState,
              account_number
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              account_number: ""
            }));
          }}
        />
        <InputField
          label="Account name"
          placeholder="E.g John Doe"
          value={formDetails.account_name}
          error={formDetailsErr.account_name}
          onChangeText={(account_name) => {
            setFormDetails((prevState) => ({
              ...prevState,
              account_name
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              account_name: ""
            }));
          }}
        />
      </View>
      <Button
        disabled={disabled}
        loading={loading}
        action={updateBank}
        type="primary"
      >
        <TextComponent textAlign="center" color={whiteColor.default}>
          Update Bank
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default BankDetails;

const styles = StyleSheet.create({});

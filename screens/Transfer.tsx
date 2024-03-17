import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import { whiteColor } from "@/assets/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNames, generalError } from "@/utils/_variables";
import { showToast, validateValues } from "@/localServices/function";
import { emailRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { createTransferApi } from "@/api/url";
import { TransferBodyType } from "@/api/index.d";
import useUser from "@/hooks/useUser";

const Transfer = () => {
  const { navigate } = useNavigation();
  const { params }: { params?: { proceed?: boolean; password?: string } } =
    useRoute();
  const initialValue: TransferBodyType = {
    amount: "",
    remarks: "",
    email: "",
    password: ""
  };
  const [formDetails, setFormDetails] = useState(initialValue);
  const [formDetailsErr, setFormDetailsErr] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const { fetchBalance, fetchUserTransactions } = useUser();
  const action = useCallback(() => {
    const { amount, email } = formDetails;
    const errors = validateValues(formDetails, {
      amount: {
        required: true,
        min: 1
      } as any,
      remarks: true as any,
      email: {
        required: true,
        regex: emailRegExp
      } as any
    });
    if (errors) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      navigate({
        name: ScreenNames.TransferConfirmation.name,
        params: {
          amount,
          email
        }
      } as never);
    }
  }, [formDetails]);

  const processWithdrawal = useCallback(() => {
    const { amount, email } = formDetails;
    setLoading(true);
    processRequest(createTransferApi, {
      ...formDetails,
      password: params?.password
    })
      .then((res) => {
        showToast(`You have successfully transferred ${amount} to ${email}`);
        fetchBalance();
        fetchUserTransactions();
      })
      .catch((err) => {
        showToast(err?.statusText || generalError);
        const errors = err?.response?.errors;
        let error = {};

        if (
          errors?.password &&
          !errors?.email &&
          !errors?.amount &&
          !errors?.remarks
        ) {
          navigate({
            name: ScreenNames.TransferConfirmation.name,
            params: {
              amount,
              email
            }
          } as never);
        }

        if (errors?.amount) {
          error = {
            ...error,
            amount: errors?.amount
          };
        }
        if (errors?.remarks) {
          error = {
            ...error,
            remarks: errors?.remarks
          };
        }
        if (errors?.email) {
          error = {
            ...error,
            email: errors?.email
          };
        }

        setFormDetailsErr((prevState) => ({
          ...prevState,
          ...error
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formDetails, params]);

  useEffect(() => {
    if (params?.proceed) {
      processWithdrawal();
    }
  }, [params]);
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 20,
        minHeight: "100%"
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 20
        }}
      >
        <InputField
          label="Email"
          inputMode="email"
          keyboardType="email-address"
          placeholder="E.g example@example.com"
          value={formDetails.email}
          onChangeText={(email) => {
            setFormDetails((prevState) => ({
              ...prevState,
              email
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              email: ""
            }));
          }}
          error={formDetailsErr.email}
        />
        <InputField
          label="Amount"
          inputMode="numeric"
          keyboardType="number-pad"
          placeholder="Input amount"
          value={formDetails.amount || "0"}
          onChangeText={(amount) => {
            setFormDetails((prevState) => ({
              ...prevState,
              amount:
                amount && !isNaN(parseInt(amount))
                  ? parseInt(amount).toString()
                  : ""
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              amount: ""
            }));
          }}
          error={formDetailsErr.amount}
        />
        <InputField
          label="Note"
          placeholder="Input amount"
          multiline
          value={formDetails.remarks}
          onChangeText={(remarks) => {
            setFormDetails((prevState) => ({
              ...prevState,
              remarks
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              remarks: ""
            }));
          }}
          error={formDetailsErr.remarks}
          inputStyle={{
            height: 100,
            textAlignVertical: "top"
          }}
        />
      </View>
      <Button
        loading={loading}
        action={action}
        type="primary"
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TextComponent color={whiteColor.default}>Transfer</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default Transfer;

const styles = StyleSheet.create({});

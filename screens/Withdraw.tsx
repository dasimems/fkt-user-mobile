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
import { processRequest } from "@/api/functions";
import { showToast, validateValues } from "@/utils/functions";
import { WithdrawalBodyType } from "@/api/index.d";
import { createWithdrawalApi } from "@/api/url";
import useUser from "@/hooks/useUser";

const Withdraw = () => {
  const { navigate } = useNavigation();
  const { params }: { params?: { proceed?: boolean } } = useRoute();
  const { fetchBalance, fetchUserTransactions } = useUser();
  const initialValue: WithdrawalBodyType = {
    amount: "",
    note: ""
  };
  const [formDetails, setFormDetails] = useState(initialValue);
  const [formDetailsErr, setFormDetailsErr] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const action = useCallback(() => {
    const { amount, note } = formDetails;

    const errors = validateValues(formDetails, {
      amount: {
        required: true,
        min: 1
      } as any,
      note: true as any
    });
    if (errors) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else {
      navigate({
        name: ScreenNames.WithdrawConfirmation.name,
        params: {
          amount
        }
      } as never);
    }
  }, [formDetails]);

  const processWithdrawal = useCallback(() => {
    const { amount } = formDetails;
    setLoading(true);
    processRequest(createWithdrawalApi, formDetails)
      .then((res) => {
        showToast(`A withdrawal of $${amount} have been initiated`);
        fetchUserTransactions();
        fetchBalance();
      })
      .catch((err) => {
        showToast(err?.statusText || generalError);
        const errors = err?.response?.errors;
        let error = {};

        if (errors?.amount) {
          error = {
            ...error,
            amount: errors?.amount
          };
        }
        if (errors?.note) {
          error = {
            ...error,
            note: errors?.note
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
  }, [formDetails]);

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
          inputMode="numeric"
          keyboardType="number-pad"
          placeholder="Input amount"
          label="Amount"
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
          placeholder="E.g My balance withdrawal"
          multiline
          value={formDetails.note}
          onChangeText={(note) => {
            setFormDetails((prevState) => ({
              ...prevState,
              note
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              note: ""
            }));
          }}
          error={formDetailsErr.note}
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
        <TextComponent color={whiteColor.default}>Withdraw</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});

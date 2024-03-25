import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import { whiteColor } from "../assets/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNames, generalError } from "@/utils/_variables";
import { DepositBodyType } from "@/api/index.d";
import { processRequest } from "@/api/functions";
import { createDepositApi } from "@/api/url";
import { showToast } from "@/utils/functions";
import useUser from "@/hooks/useUser";

const Deposit = () => {
  const { navigate } = useNavigation();
  const { params }: { params?: { proceed?: boolean } } = useRoute();
  const initialValue: DepositBodyType = {
    amount: ""
  };

  const { fetchBalance, fetchUserTransactions } = useUser();
  const [formDetails, setFormDetails] = useState(initialValue);
  const [formDetailsErr, setFormDetailsErr] = useState({
    amount: ""
  });
  const [loading, setLoading] = useState(false);
  const action = useCallback(() => {
    const { amount } = formDetails;
    if (parseInt(amount as string) >= 1) {
      navigate({
        name: ScreenNames.DepositConfirmation.name,
        params: {
          amount
        }
      } as never);
    } else {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        amount: "Please your withdrawal amount must be $1 or more"
      }));
    }
  }, [formDetails]);

  const processDeposit = useCallback(() => {
    setLoading(true);
    processRequest(createDepositApi, formDetails)
      .then((res) => {
        showToast(
          "Please follow the instructions in the next screen to proceed"
        );
        console.log(res);
        fetchBalance();
        fetchUserTransactions();
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
      processDeposit();
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
          flex: 1
        }}
      >
        <InputField
          inputMode="numeric"
          keyboardType="number-pad"
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
        <TextComponent color={whiteColor.default}>Deposit</TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default Deposit;

const styles = StyleSheet.create({});

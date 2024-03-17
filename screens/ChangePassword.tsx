import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../assets/colors";
import { useUserContext } from "@/context";
import useUser from "@/hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import { UpdatePasswordBodyType } from "@/api/index.d";
import { showToast, validateValues } from "@/localServices/function";
import { processRequest } from "@/api/functions";
import { updatePasswordApi } from "@/api/url";
import { generalError } from "@/utils/_variables";

const ChangePassword = () => {
  const { goBack } = useNavigation();
  const { fetchUserDetails } = useUser();
  const initialValue: UpdatePasswordBodyType = {
    password: "",
    current_password: "",
    password_confirmation: ""
  };
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState(initialValue);
  const [formDetailsErr, setFormDetailsErr] = useState(initialValue);

  const updatePassword = useCallback(() => {
    const { password, password_confirmation } = formDetails;

    const errors = validateValues(formDetails, {
      password: true as any,
      password_confirmation: true as any,
      current_password: true as any
    });
    if (errors) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        ...errors
      }));
    } else if (password !== password_confirmation) {
      setFormDetailsErr((prevState) => ({
        ...prevState,
        password_confirmation: "Your password doesn't match"
      }));
    } else {
      setLoading(true);
      processRequest(updatePasswordApi, formDetails)
        .then((res) => {
          showToast("Password changed successfully");
          goBack();
        })
        .catch((err) => {
          const errors = err?.response?.errors;
          showToast(err?.statusText || generalError);

          let error = {};
          if (errors) {
            if (errors?.password) {
              error = {
                ...error,
                password: errors?.password
              };
            }
            if (errors?.password_confirmation) {
              error = {
                ...error,
                password_confirmation: errors?.password_confirmation
              };
            }
            if (errors?.current_password) {
              error = {
                ...error,
                current_password: errors?.current_password
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
          label="Old password"
          secureTextEntry
          placeholder="Old password"
          value={formDetails.current_password}
          error={formDetailsErr.current_password}
          onChangeText={(current_password) => {
            setFormDetails((prevState) => ({
              ...prevState,
              current_password
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              current_password: ""
            }));
          }}
        />
        <InputField
          label="New password"
          secureTextEntry
          placeholder="New password"
          value={formDetails.password}
          error={formDetailsErr.password}
          onChangeText={(password) => {
            setFormDetails((prevState) => ({
              ...prevState,
              password
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              password: ""
            }));
          }}
        />
        <InputField
          label="Repeat password"
          secureTextEntry
          placeholder="Repeat password"
          value={formDetails.password_confirmation}
          error={formDetailsErr.password_confirmation}
          onChangeText={(password_confirmation) => {
            setFormDetails((prevState) => ({
              ...prevState,
              password_confirmation
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              password_confirmation: ""
            }));
          }}
        />
      </View>
      <Button loading={loading} action={updatePassword} type="primary">
        <TextComponent textAlign="center" color={whiteColor.default}>
          Update password
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});

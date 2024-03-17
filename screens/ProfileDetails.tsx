import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { whiteColor } from "../assets/colors";
import { useUserContext } from "@/context";
import { UpdateProfileBodyType } from "@/api/index.d";
import { showToast, validateValues } from "@/localServices/function";
import { emailRegExp, phoneNumberRegExp } from "@/utils/regex";
import { processRequest } from "@/api/functions";
import { updateUserDetailsApi } from "@/api/url";
import { generalError } from "@/utils/_variables";
import useUser from "@/hooks/useUser";
import { useNavigation } from "@react-navigation/native";

const ProfileDetails = () => {
  const { userDetails } = useUserContext();
  const { fetchUserDetails } = useUser();
  const { goBack } = useNavigation();
  const initialValue: UpdateProfileBodyType = useMemo(
    () => ({
      name: userDetails?.name || "",
      phone: userDetails?.phone || "",
      email: userDetails?.email || ""
    }),
    [userDetails]
  );
  const [formDetails, setFormDetails] =
    useState<UpdateProfileBodyType>(initialValue);
  const [formDetailsErr, setFormDetailsErr] = useState<UpdateProfileBodyType>({
    email: "",
    name: "",
    phone: ""
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const updateProfile = useCallback(() => {
    const errors = validateValues(formDetails, {
      name: true,
      email: {
        required: true,
        regex: emailRegExp
      } as any,
      phone: {
        required: true,
        regex: phoneNumberRegExp
      } as any
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
          showToast("Profile details updated successfully");
          fetchUserDetails();
          goBack();
        })
        .catch((err) => {
          const errors = err?.response?.errors;
          showToast(err?.statusText || generalError);
          let error = {};

          if (errors) {
            if (errors?.email) {
              error = {
                ...error,
                email: errors?.email
              };
            }
            if (errors?.phone) {
              error = {
                ...error,
                phone: errors?.phone
              };
            }
            if (errors?.name) {
              error = {
                ...error,
                name: errors?.name
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
    const { name, email, phone } = formDetails;
    const {
      name: initialName,
      email: initialEmail,
      phone: initialPhone
    } = initialValue;

    if (
      (name && name !== initialName) ||
      (email && email !== initialEmail) ||
      (phone && phone !== initialPhone)
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
          label="Name"
          placeholder="E.g John Doe"
          value={formDetails.name}
          error={formDetailsErr.name}
          onChangeText={(name) => {
            setFormDetails((prevState) => ({
              ...prevState,
              name
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              name: ""
            }));
          }}
        />
        <InputField
          label="Email"
          inputMode="email"
          keyboardType="email-address"
          placeholder="E.g example@example.com"
          value={formDetails.email}
          error={formDetailsErr.email}
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
        />
        <InputField
          inputMode="tel"
          keyboardType="number-pad"
          label="Phone number"
          placeholder="E.g +(256) 903-663-4645"
          value={formDetails.phone}
          error={formDetailsErr.phone}
          onChangeText={(phone) => {
            setFormDetails((prevState) => ({
              ...prevState,
              phone
            }));
            setFormDetailsErr((prevState) => ({
              ...prevState,
              phone: ""
            }));
          }}
        />
      </View>
      <Button
        disabled={disabled}
        loading={loading}
        action={updateProfile}
        type="primary"
      >
        <TextComponent textAlign="center" color={whiteColor.default}>
          Update profile
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});

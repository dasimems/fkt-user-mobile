import { TouchableOpacity, View, useColorScheme } from "react-native";
import React, { useCallback, useState } from "react";
import Container from "@/components/_layouts/Container";
import {
  ScreenNames,
  colorSchemes,
  defaultIconProps,
  padding
} from "@/utils/_variables";
import { backgroundColorDark, primaryColor, whiteColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { LogInIcon } from "lucide-react-native";
import { LoginImage } from "@/assets/images";
import styles from "../utils/styles";
import { useNavigation } from "@react-navigation/native";
import { useActionContext, useUserContext } from "@/context";
import { LoginBodyType } from "@/api/index.d";
import { processRequest } from "@/api/functions";
import { loginApi } from "@/api/url";
import { openLinkInBrowser, showToast } from "@/utils/functions";
import { saveUserToken } from "@/localServices/function";
import { setHeaderAuthorization } from "@/api";
import useUser from "@/hooks/useUser";
import { FORGOT_PASSWORD_URL } from "@env";

const Login = () => {
  const { colorScheme } = useActionContext();
  const { setToken } = useUserContext();
  const { fetchUserDetails } = useUser();
  const { navigate } = useNavigation();
  const initialValue: LoginBodyType = {
    email: "",
    password: ""
  };
  const [loginForm, setLoginForm] = useState(initialValue);
  const [loginFormErr, setLoginFormErr] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const loginUser = useCallback(() => {
    const { email, password } = loginForm;
    if (email.length > 0 && password.length > 0) {
      // navigate(ScreenNames.Dashboard.name as never);
      setLoading(true);
      processRequest(loginApi, loginForm)
        .then((res) => {
          const token = res?.response?.authentication?.token;

          if (token) {
            setToken(token);
            saveUserToken(token);
            setHeaderAuthorization(token);
            fetchUserDetails();
          } else {
            showToast("Invalid Request - Token error");
          }
        })
        .catch((err) => {
          showToast(err?.statusText || "Error encountered when logging in");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      let error = { ...initialValue };

      if (email.length < 1) {
        error.email = "Please provide your email";
      }

      if (password.length < 1) {
        error.password = "Please provide your password";
      }

      setLoginFormErr((prevState) => ({
        ...error
      }));
    }
  }, [loginForm]);
  return (
    <Container
      safeView
      style={{
        gap: 20,
        paddingVertical: 20,
        paddingHorizontal: padding,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? backgroundColorDark.default
            : whiteColor.default
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          justifyContent: "space-between"
        }}
      >
        <TextComponent
          color={primaryColor.default}
          fontFamily={Poppins.semiBold.default}
        >
          Welcome
        </TextComponent>

        <TouchableOpacity
          onPress={() => {
            navigate(ScreenNames.Register.name as never);
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 15,
            backgroundColor: primaryColor.default
          }}
        >
          <TextComponent color={whiteColor.default}>Register</TextComponent>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <LoginImage width="100%" height="100%" />
      </View>
      <View
        style={{
          gap: 20
        }}
      >
        <InputField
          value={loginForm.email}
          inputStyle={{
            ...styles.inputStyle,
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity50
                : styles.inputStyle.backgroundColor
          }}
          label="Email"
          placeholder="Your email"
          inputMode="email"
          keyboardType="email-address"
          error={loginFormErr.email}
          onChangeText={(email) => {
            setLoginForm((prevState) => ({
              ...prevState,
              email
            }));
            setLoginFormErr((prevState) => ({
              ...prevState,
              email: ""
            }));
          }}
        />
        <InputField
          value={loginForm.password}
          error={loginFormErr.password}
          inputStyle={{
            ...styles.inputStyle,
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity50
                : styles.inputStyle.backgroundColor
          }}
          label="Password"
          placeholder="Your password"
          secureTextEntry
          onChangeText={(password) => {
            setLoginForm((prevState) => ({
              ...prevState,
              password
            }));
            setLoginFormErr((prevState) => ({
              ...prevState,
              password: ""
            }));
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              openLinkInBrowser(FORGOT_PASSWORD_URL);
            }}
          >
            <TextComponent color={primaryColor.default}>
              Forgot password?
            </TextComponent>
          </TouchableOpacity>
        </View>
        <Button
          loading={loading}
          action={loginUser}
          type="primary"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10
          }}
        >
          <TextComponent textAlign="center" color={whiteColor.default}>
            Login
          </TextComponent>
          <LogInIcon {...defaultIconProps} color={whiteColor.default} />
        </Button>
      </View>
    </Container>
  );
};

export default Login;

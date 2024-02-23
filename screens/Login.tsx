import { TouchableOpacity, View, useColorScheme } from "react-native";
import React from "react";
import Container from "@/components/_layouts/Container";
import {
  ScreenNames,
  colorSchemes,
  defaultIconProps,
  padding
} from "@/utils/_variables";
import { primaryColor, whiteColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import TextComponent from "@/components/_general/TextComponent";
import InputField from "@/components/_general/form/InputField";
import Button from "@/components/_general/Button";
import { LogInIcon } from "lucide-react-native";
import { LoginImage } from "@/assets/images";
import styles from "../utils/styles";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const colorScheme = useColorScheme();
  const { navigate } = useNavigation();
  return (
    <Container
      safeView
      style={{ gap: 20, paddingVertical: 20, paddingHorizontal: padding }}
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
        />
        <InputField
          inputStyle={{
            ...styles.inputStyle,
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity50
                : styles.inputStyle.backgroundColor
          }}
          label="Email"
          placeholder="Your password"
          secureTextEntry
        />
        <Button
          action={() => {
            navigate(ScreenNames.Dashboard.name as never);
          }}
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

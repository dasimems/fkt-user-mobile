import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import Container from "@/components/_layouts/Container";
import {
  ScreenNames,
  colorSchemes,
  defaultIconProps,
  padding
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { primaryColor, whiteColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import InputField from "@/components/_general/form/InputField";
import styles from "../utils/styles";
import ScrollComponent from "@/components/_general/ScrollComponent";
import Button from "@/components/_general/Button";
import { UserPlus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const colorScheme = useColorScheme();
  const { navigate } = useNavigation();
  return (
    <Container safeView>
      <ScrollComponent
        style={{
          paddingVertical: 20,
          paddingHorizontal: padding,
          gap: 20
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
            Join us today!
          </TextComponent>

          <TouchableOpacity
            onPress={() => {
              navigate(ScreenNames.Login.name as never);
            }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 15,
              backgroundColor: primaryColor.default
            }}
          >
            <TextComponent color={whiteColor.default}>Login</TextComponent>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, gap: 20 }}>
          <InputField
            label="Full name"
            placeholder="E.g John Doe"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Email"
            inputMode="email"
            keyboardType="email-address"
            placeholder="E.g example@example.com"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Username"
            placeholder="E.g john"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Phone number"
            inputMode="tel"
            keyboardType="number-pad"
            placeholder="E.g +(256) 903-3663-4645"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />

          <InputField
            label="Date of birth"
            placeholder="DD-MM-YYYY"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Password"
            placeholder="*********"
            secureTextEntry
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Repeat Password"
            placeholder="*********"
            secureTextEntry
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Assist code (optional)"
            placeholder="E.g XYWIGVZ"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <InputField
            label="Community code (optional)"
            placeholder="E.g CYXUGDO"
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity50
                  : styles.inputStyle.backgroundColor
            }}
          />
          <Button
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
            <UserPlus {...defaultIconProps} color={whiteColor.default} />
          </Button>
        </View>
      </ScrollComponent>
    </Container>
  );
};

export default Register;

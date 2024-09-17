import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "@/components/_layouts/Container";
import {
  defaultIconProps,
  padding,
  screenHeight,
  screenWidth
} from "@/utils/_variables";
import { ArrowLeft } from "lucide-react-native";
import OTPForm from "@/components/_general/form/OTPForm";
import TextComponent from "@/components/_general/TextComponent";
import Button from "@/components/_general/Button";
import { whiteColor, primaryColor, blackColor } from "../../../assets/colors";
import { LoadingOne } from "@/assets/images";

const VerifyAccountContent: React.FC<{
  title?: string;
  description?: string;
  resendOTP: () => void;
  verifyOTP: (otp: string) => void;
  loading?: boolean;
}> = ({
  title = "Account Verification",
  description = "Please input the otp sent to you",
  resendOTP,
  verifyOTP,
  loading
}) => {
  const { goBack } = useNavigation();
  const [otp, setOTP] = useState("");
  return (
    <>
      <Container
        safeView
        style={{
          flex: 1,
          paddingHorizontal: padding,
          gap: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            paddingVertical: 20
          }}
        >
          <TouchableOpacity onPress={goBack}>
            <ArrowLeft {...defaultIconProps} />
          </TouchableOpacity>
        </View>

        <TextComponent
          fontSize={18}
          textAlign="center"
          style={{
            fontWeight: 700
          }}
        >
          {title}
        </TextComponent>
        <TextComponent textAlign="center" style={{ opacity: 0.6 }}>
          {description}
        </TextComponent>
        <View
          style={{
            width: "100%"
          }}
        >
          <OTPForm
            max={7}
            loading={loading}
            onChange={(otp) => {
              setOTP(otp);
            }}
          />
        </View>

        <Button
          disabled={otp.length !== 7}
          // loading={loading}
          action={() => {
            if (verifyOTP) {
              verifyOTP(otp);
            }
          }}
          type="primary"
          style={{
            marginTop: 20
          }}
        >
          <TextComponent textAlign="center" color={whiteColor.default}>
            Verify
          </TextComponent>
        </Button>
        <TouchableOpacity
          onPress={loading ? undefined : resendOTP}
          style={{
            opacity: loading ? 0.4 : 1,
            alignSelf: "center"
          }}
        >
          <TextComponent textAlign="center" color={primaryColor.default}>
            Resend OTP
          </TextComponent>
        </TouchableOpacity>
      </Container>
      {loading && (
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            backgroundColor: blackColor.opacity300,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
          <Image
            source={LoadingOne}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain"
            }}
          />
        </View>
      )}
    </>
  );
};

export default VerifyAccountContent;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import VerifyAccountContent from "@/components/_screens/_general/VerifyAccountContent";
import { useUserContext } from "@/context";
import { processRequest } from "@/api/functions";
import { sendPhoneOTPApi, verifyPhoneApi } from "@/api/url";
import { showToast } from "@/utils/functions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useUser from "@/hooks/useUser";

const VerifyPhone = () => {
  const [loading, setLoading] = useState(false);
  const [_, setOTPSent] = useState(false);
  const isFocused = useIsFocused();
  const { goBack } = useNavigation();
  const { fetchUserDetails } = useUser();
  const { userDetails, setUserDetails } = useUserContext();
  const resendOTP = useCallback(() => {
    setLoading(true);
    processRequest(sendPhoneOTPApi, {
      phone: userDetails?.phone
    })
      .then((res) => {
        showToast("An SMS has been sent to your mobile number");
      })
      .catch((error) => {
        showToast(error?.statusText ?? "Error encountered whilst sending SMS");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userDetails]);

  const verifyOTP = useCallback(
    (otp: string) => {
      if (!otp) {
        showToast("Empty OTP sent");
        return;
      }
      setLoading(true);
      processRequest(verifyPhoneApi, {
        phone: userDetails?.phone,
        otp
      })
        .then(() => {
          showToast("Phone number verified successfully");
          if (userDetails) {
            setUserDetails({ ...userDetails, phone_verified: true });
          }
          fetchUserDetails();
          goBack();
        })
        .catch((error) => {
          showToast(
            error?.statusText ?? "Error encountered whilst verifying OTP"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [userDetails]
  );
  useEffect(() => {
    if (isFocused && userDetails) {
      setOTPSent((prevState) => {
        if (!prevState) {
          resendOTP();
        }
        return true;
      });
    }
  }, [userDetails, isFocused]);
  return (
    <>
      <VerifyAccountContent
        loading={loading}
        resendOTP={resendOTP}
        verifyOTP={verifyOTP}
        title="Mobile number verification"
        description={`Please provide the OTP sent to your mobile number +${userDetails?.phone}`}
      />
    </>
  );
};

export default VerifyPhone;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import VerifyAccountContent from "@/components/_screens/_general/VerifyAccountContent";
import { useUserContext } from "@/context";
import { processRequest } from "@/api/functions";
import { sendEmailOTPApi, verifyEmailApi } from "@/api/url";
import { showToast } from "@/utils/functions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useUser from "@/hooks/useUser";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [_, setOTPSent] = useState(false);
  const isFocused = useIsFocused();
  const { goBack } = useNavigation();
  const { fetchUserDetails } = useUser();
  const { userDetails, setUserDetails } = useUserContext();
  const resendOTP = useCallback(() => {
    setLoading(true);
    processRequest(sendEmailOTPApi, {
      email: userDetails?.email
    })
      .then((res) => {
        showToast("An email has been sent to your email address");
      })
      .catch((error) => {
        showToast(
          error?.statusText ?? "Error encountered whilst sending email OTP"
        );
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
      processRequest(verifyEmailApi, {
        email: userDetails?.email,
        otp
      })
        .then(() => {
          showToast("Email verified successfully");
          if (userDetails) {
            setUserDetails({ ...userDetails, email_verified: true });
          }
          fetchUserDetails();
          goBack();
        })
        .catch((error) => {
          showToast(
            error?.statusText ?? "Error encountered whilst verifying email OTP"
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
        title="Email verification"
        description={`Please provide the otp sent to your email ${userDetails?.email}`}
      />
    </>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});

import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputField from "./InputField";

const OTPForm: React.FC<{
  error?: string;
  max?: number;
  onChange: (otp: string) => void;
  loading?: boolean;
}> = ({ max = 4, error, onChange, loading }) => {
  const [otp, setOtp] = useState(new Array(max).fill(""));
  const ref = useRef<TextInput[]>([]);

  const handleBackspace = useCallback((index: number) => {
    const otpForms = ref.current;
    if (index !== 0) {
      otpForms[index - 1].focus();
    }
  }, []);

  const handleOnChange = useCallback((value: string, index: number) => {
    if (value?.trim().length > 0) {
      if (isNaN(parseInt(value?.trim()))) {
        return;
      }

      if (index < otp.length - 1) {
        const element = ref?.current;
        if (element) {
          const presentElement = element[index + 1];

          if (presentElement) {
            presentElement?.focus();
          }
        }
      }
    }
    setOtp((prevState) =>
      prevState.map((val, valIndex) => (index === valIndex ? value : val))
    );
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(otp?.join(""));
    }
  }, [otp]);
  return (
    <View style={{ gap: 3, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center"
        }}
      >
        {otp.map((value, index) => (
          <InputField
            preventKeyBoardAutoHide
            editable={!loading}
            ref={(element) => {
              if (element) {
                ref.current[index] = element;
              }
            }}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            value={value}
            key={index}
            inputParentStyle={{
              width: 50
            }}
            style={{}}
            onChangeText={(inputedValue) => {
              if (inputedValue.length > 1) {
                inputedValue = inputedValue.slice(inputedValue.length - 1);
              }
              handleOnChange(inputedValue, index);
            }}
            inputStyle={{
              width: 50,
              height: 50,
              paddingVertical: 0,
              paddingHorizontal: 0,
              textAlignVertical: "center",
              textAlign: "center"
            }}
            error={!!error}
          />
        ))}
      </View>
    </View>
  );
};

export default OTPForm;

const styles = StyleSheet.create({});

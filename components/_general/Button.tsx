import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ButtonType } from "@/utils/types";
import {
  backgroundColor,
  blackColor,
  primaryColor,
  whiteColor
} from "@/assets/colors";
import { buttonTypes, colorSchemes } from "@/utils/_variables";
import { LoadingOne, LoadingThree, LoadingTwo } from "@/assets/images";
import { useActionContext } from "@/context";

const Button: React.FC<ButtonType> = ({
  action,
  disabled,
  loading,
  children,
  type,
  style,
  loaderType,
  ...props
}) => {
  const { colorScheme } = useActionContext();
  let typeStyles: { backgroundColor: string } = {
    backgroundColor:
      colorScheme === colorSchemes.dark
        ? whiteColor.opacity100
        : whiteColor.default
  };
  let loader = LoadingOne;

  switch (type) {
    case buttonTypes.primary:
      typeStyles = {
        backgroundColor: primaryColor.default
      };
      break;
    case buttonTypes.default:
      typeStyles = {
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : whiteColor.default
      };
      break;
    case buttonTypes.secondary:
      typeStyles = {
        backgroundColor: backgroundColor.default
      };
      break;
    case buttonTypes.transparent:
      typeStyles = {
        backgroundColor: "transparent"
      };
      break;
    default:
      break;
  }

  switch (loaderType) {
    case "loader-one":
      loader = LoadingOne;
      break;
    case "loader-two":
      loader = LoadingTwo;
      break;
    case "loader-three":
      loader = LoadingThree;
      break;
    default:
      break;
  }
  return disabled || loading ? (
    <View
      style={{
        overflow: "hidden",
        borderRadius: 15,
        opacity: disabled ? 0.5 : 1
      }}
    >
      <View
        style={{
          ...typeStyles,
          ...styles.buttonStyle,
          ...style
        }}
      >
        {children}
      </View>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: blackColor.opacity300
          }}
        >
          <Image
            source={loader}
            style={{
              maxWidth: "100%",
              height: "100%",
              resizeMode: "contain"
            }}
          />
        </View>
      )}
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => {
        if (action && typeof action === "function") {
          action();
        }
      }}
      style={{
        ...typeStyles,
        ...styles.buttonStyle,
        ...style
      }}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    overflow: "hidden"
  }
});

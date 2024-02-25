import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import { blackColor, whiteColor } from "@/assets/colors";
import { colorSchemes, defaultIconProps, padding } from "@/utils/_variables";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ScrollComponent from "./ScrollComponent";
import TextComponent from "../_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { ModalLayoutType } from "@/utils/types";
import Button from "../_general/Button";
import { X } from "lucide-react-native";

const ModalLayout: React.FC<ModalLayoutType> = ({
  children,
  action,
  hideActions,
  hideHeader,
  hideCancelIcon,
  contentContainerStyle,
  headerText,
  onClose,
  cancelActionText = "Cancel",
  continueActionText = "Continue",
  continueActionButtonStyle,
  continueActionButtonTextColor = whiteColor.default,
  cancelActionButtonStyle,
  cancelActionButtonTextColor,
  loading,
  disabled
}) => {
  const colorScheme = useColorScheme();
  const { goBack } = useNavigation();
  const processCancel = () => {
    if (!loading) {
      if (onClose && typeof onClose === "function") {
        onClose();
      } else {
        goBack();
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: blackColor.opacity300
      }}
    >
      <TouchableOpacity
        onPress={processCancel}
        style={{
          flex: 1
        }}
      ></TouchableOpacity>
      <View
        style={{
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? blackColor.default
              : whiteColor.default,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <SafeAreaView
          style={{
            gap: 30,
            paddingBottom: 25
          }}
        >
          {!hideHeader && (
            <View
              style={{
                paddingBottom: 10,
                paddingHorizontal: padding,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <TextComponent fontFamily={Poppins.medium.default}>
                {headerText}
              </TextComponent>

              {!hideCancelIcon && (
                <TouchableOpacity onPress={processCancel}>
                  <X {...defaultIconProps} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <ScrollComponent
            style={{
              gap: 20,
              paddingHorizontal: padding,
              minHeight: 0,
              ...contentContainerStyle
            }}
          >
            {children}
          </ScrollComponent>
          {!hideActions && (
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                paddingHorizontal: padding
              }}
            >
              <Button
                disabled={loading}
                action={processCancel}
                style={{
                  ...styles.buttonStyle,
                  borderWidth: 1,
                  borderColor: blackColor.opacity100,
                  ...cancelActionButtonStyle
                }}
              >
                <TextComponent color={cancelActionButtonTextColor}>
                  {cancelActionText}
                </TextComponent>
              </Button>
              <Button
                type="primary"
                style={{
                  ...styles.buttonStyle,
                  ...continueActionButtonStyle
                }}
                action={action}
                loading={loading}
                disabled={disabled}
              >
                <TextComponent color={continueActionButtonTextColor}>
                  {continueActionText}
                </TextComponent>
              </Button>
            </View>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ModalLayout;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1 / 2,
    alignItems: "center"
  }
});

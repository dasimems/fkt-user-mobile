import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { defaultIconProps, colorSchemes } from "@/utils/_variables";
import { ScreenNamesType } from "@/utils/types";
import TextComponent from "@/components/_general/TextComponent";
import { ArrowRight2 } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { blackColor, whiteColor } from "@/assets/colors";
import { useActionContext } from "@/context";

const ProfileRoute: React.FC<
  ScreenNamesType & { rightContent?: React.ReactNode }
> = ({ Icon, label, name, rightContent }) => {
  const { navigate } = useNavigation();
  const { colorScheme } = useActionContext();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(name as never);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10
      }}
    >
      {Icon && (
        <Icon
          {...defaultIconProps}
          color={
            colorScheme === colorSchemes.dark
              ? whiteColor.default
              : blackColor.default
          }
        />
      )}
      <TextComponent
        style={{
          flex: 1
        }}
      >
        {label}
      </TextComponent>
      {rightContent || (
        <ArrowRight2
          {...defaultIconProps}
          color={
            colorScheme === colorSchemes.dark
              ? whiteColor.default
              : blackColor.default
          }
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfileRoute;

const styles = StyleSheet.create({});

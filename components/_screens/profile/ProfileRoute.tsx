import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { defaultIconProps } from "@/utils/_variables";
import { ScreenNamesType } from "@/utils/types";
import TextComponent from "@/components/_general/TextComponent";
import { ArrowRight2 } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileRoute: React.FC<ScreenNamesType> = ({ Icon, label, name }) => {
  const { navigate } = useNavigation();
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
      {Icon && <Icon {...defaultIconProps} />}
      <TextComponent
        style={{
          flex: 1
        }}
      >
        {label}
      </TextComponent>
      <ArrowRight2 {...defaultIconProps} />
    </TouchableOpacity>
  );
};

export default ProfileRoute;

const styles = StyleSheet.create({});

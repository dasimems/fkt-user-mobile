import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { colorSchemes } from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const DetailsCard: React.FC<{ title: string; value: string }> = ({
  title,
  value
}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? blackColor.default
            : whiteColor.default,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "space-between"
      }}
    >
      <TextComponent fontFamily={Poppins.semiBold.default}>
        {title}
      </TextComponent>
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        {value}
      </TextComponent>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({});

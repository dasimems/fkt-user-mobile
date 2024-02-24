import { StyleSheet, Text, useColorScheme } from "react-native";
import React from "react";
import { colorSchemes } from "@/utils/_variables";
import { textColor } from "@/assets/colors";
import { TextComponentType } from "@/utils/types";
import { Poppins } from "@/assets/fonts";

const TextComponent: React.FC<TextComponentType> = ({
  children,
  fontSize = 15,
  color = useColorScheme() === colorSchemes.dark
    ? textColor.dark.default
    : textColor.light.default,
  fontFamily = Poppins.regular.default,
  textAlign = "left",
  style,
  ...props
}) => {
  return (
    <Text
      style={{
        color,
        fontSize,
        fontFamily,
        textAlign,
        ...style
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({});

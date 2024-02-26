import { StyleSheet, Text, useColorScheme } from "react-native";
import React from "react";
import { colorSchemes } from "@/utils/_variables";
import { textColor } from "@/assets/colors";
import { TextComponentType } from "@/utils/types";
import { Poppins } from "@/assets/fonts";
import { useActionContext } from "@/context";

const TextComponent: React.FC<TextComponentType> = ({
  children,
  fontSize = 15,
  color,
  fontFamily = Poppins.regular.default,
  textAlign = "left",
  style,
  ...props
}) => {
  const { colorScheme } = useActionContext();
  if (!color) {
    color =
      colorScheme === colorSchemes.dark
        ? textColor.dark.default
        : textColor.light.default;
  }
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

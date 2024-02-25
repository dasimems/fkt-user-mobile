import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { colorSchemes, windowWidth } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";

const borderRadius = 15;

const ChatDetailsCard: React.FC<{
  isSender?: boolean;
  message: string;
  time: string;
}> = ({ isSender, message, time }) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: isSender ? "flex-end" : "flex-start"
      }}
    >
      <View
        style={{
          backgroundColor: isSender
            ? primaryColor.opacity600
            : colorScheme === colorSchemes.dark
            ? blackColor.default
            : whiteColor.default,
          paddingVertical: 15,
          paddingHorizontal: 20,
          maxWidth: windowWidth * 0.5,
          borderRadius,
          borderTopLeftRadius: isSender ? borderRadius : 0,
          borderTopRightRadius: isSender ? 0 : borderRadius
        }}
      >
        <TextComponent color={isSender ? whiteColor.default : undefined}>
          {message}
        </TextComponent>
      </View>
    </View>
  );
};

export default ChatDetailsCard;

const styles = StyleSheet.create({});

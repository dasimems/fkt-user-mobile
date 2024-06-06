import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { useActionContext } from "@/context";
import { colorSchemes } from "@/utils/_variables";
import { Poppins } from "@/assets/fonts";

const CommentCard: React.FC<{ isSender?: boolean }> = ({ isSender }) => {
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: isSender ? "row-reverse" : "row"
      }}
    >
      <View
        style={{
          padding: 10,
          paddingHorizontal: 15,
          borderRadius: 20,
          borderBottomLeftRadius: isSender ? 20 : 0,
          borderBottomRightRadius: isSender ? 0 : 20,
          backgroundColor: isSender
            ? primaryColor.default
            : colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : blackColor.opacity100
        }}
      >
        <TextComponent
          color={isSender ? whiteColor.default : undefined}
          fontFamily={Poppins.medium.default}
        >
          {isSender ? "You" : "Duyil Ayomid"}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
          color={isSender ? whiteColor.default : undefined}
        >
          This is a comment made to this comment
        </TextComponent>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});

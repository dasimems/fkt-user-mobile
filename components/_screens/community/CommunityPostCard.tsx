import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { blackColor, whiteColor } from "@/assets/colors";
import { useActionContext } from "@/context";
import {
  colorSchemes,
  defaultIconProps,
  ScreenNames
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { EyeSlash } from "iconsax-react-native";
import { MessageCircleMore } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const CommunityPostCard = () => {
  const { colorScheme } = useActionContext();
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(ScreenNames.CommunityPostDetails.name as never);
      }}
      style={{
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10
      }}
    >
      <View
        style={{
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100,
          width: 50,
          height: 50,
          borderRadius: 9000
        }}
      ></View>

      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          This is the post title
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...
        </TextComponent>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            gap: 20,
            opacity: 0.6
          }}
        >
          <TextComponent fontSize={13}>11-12-2024</TextComponent>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2
            }}
          >
            <EyeSlash
              {...defaultIconProps}
              color={
                colorScheme === colorSchemes.dark
                  ? whiteColor.default
                  : blackColor.default
              }
              size={13}
            />
            <TextComponent>20</TextComponent>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2
            }}
          >
            <MessageCircleMore
              {...defaultIconProps}
              color={
                colorScheme === colorSchemes.dark
                  ? whiteColor.default
                  : blackColor.default
              }
              size={13}
            />
            <TextComponent>40</TextComponent>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityPostCard;

const styles = StyleSheet.create({});

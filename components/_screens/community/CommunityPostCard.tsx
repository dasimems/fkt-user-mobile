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
import { EyeOff, MessageCircleMore, ThumbsUp } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { FetchedCommunityPostType } from "@/api/index.d";
import moment from "moment";

const CommunityPostCard: React.FC<FetchedCommunityPostType> = ({
  comments = [],
  createdAt = new Date(),
  id,
  post = "",
  title = "",
  views = [],
  likes = []
}) => {
  const { colorScheme } = useActionContext();
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate({
          name: ScreenNames.CommunityPostDetails.name,
          params: {
            id
          }
        } as never);
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
          {title}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          {post.length > 63 ? `${post.slice(0, 62)}...` : post}
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
          <TextComponent fontSize={13}>
            {moment(createdAt).format("DD-MM-YYYY")}
          </TextComponent>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2
            }}
          >
            <EyeOff
              {...defaultIconProps}
              color={
                colorScheme === colorSchemes.dark
                  ? whiteColor.default
                  : blackColor.default
              }
              size={13}
            />
            <TextComponent>{views.length}</TextComponent>
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
            <TextComponent>{comments.length}</TextComponent>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2
            }}
          >
            <ThumbsUp
              {...defaultIconProps}
              color={
                colorScheme === colorSchemes.dark
                  ? whiteColor.default
                  : blackColor.default
              }
              size={13}
            />
            <TextComponent>{likes.length || 0}</TextComponent>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityPostCard;

const styles = StyleSheet.create({});

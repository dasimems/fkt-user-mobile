import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import { primaryColor, whiteColor } from "@/assets/colors";
import { blackColor } from "../assets/colors";
import { useActionContext } from "@/context";
import { colorSchemes, defaultIconProps } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { EyeSlash, Send2 } from "iconsax-react-native";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import ScrollComponent from "@/components/_general/ScrollComponent";
import CommentCard from "@/components/_screens/community-post-details/CommentCard";

const CommunityPostDetails = () => {
  const { colorScheme } = useActionContext();
  return (
    <LoggedInContainer
      contentContainerStyle={{
        flex: 1
      }}
      header={<InnerScreenHeader />}
      hideNav
      headerText="Post details"
      unScrollable
    >
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollComponent
          style={{
            minHeight: 0
          }}
        >
          <View
            style={{
              paddingBottom: 30,
              borderBottomWidth: 1,
              borderColor:
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity100
                  : blackColor.opacity100,
              gap: 6
            }}
          >
            <TextComponent fontSize={20} fontFamily={Poppins.semiBold.default}>
              This is the post title
            </TextComponent>

            <View
              style={{
                opacity: 0.6,
                flexDirection: "row",
                alignItems: "center",
                gap: 20
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
            </View>

            <TextComponent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </TextComponent>
          </View>

          <View
            style={{
              paddingVertical: 20,
              gap: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                justifyContent: "space-between"
              }}
            >
              <TextComponent>Comments -</TextComponent>
              <TextComponent>40</TextComponent>
            </View>

            <View
              style={{
                opacity: 20,
                gap: 20
              }}
            >
              {new Array(6).fill(0).map((_, index) => (
                <CommentCard isSender={index / 3 === 1} key={index} />
              ))}
            </View>
          </View>
        </ScrollComponent>
      </View>
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 20,
          width: "100%"
        }}
      >
        <InputField
          style={{
            flex: 1
          }}
          inputStyle={{
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : blackColor.opacity50,
            paddingVertical: 10,
            textAlignVertical: "top",
            maxHeight: 100
          }}
          multiline
          placeholder="Enter comment here..."
        />
        <TouchableOpacity>
          <Send2
            {...defaultIconProps}
            color={primaryColor.default}
            size={30}
            variant="Bold"
          />
        </TouchableOpacity>
      </View>
    </LoggedInContainer>
  );
};

export default CommunityPostDetails;

const styles = StyleSheet.create({});

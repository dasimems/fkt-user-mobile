import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import {
  colorSchemes,
  defaultIconProps,
  windowWidth
} from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import { Share2, Users } from "lucide-react-native";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { useActionContext, useUserContext } from "@/context";
import SkeletonLoader from "@/components/_general/SkeletonLoader";

const ReferralCard = () => {
  const { colorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  return userDetails ? (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : whiteColor.default,
        borderRadius: 90000,
        padding: 10,
        paddingRight: 20,
        gap: 10
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100,
          borderRadius: 90000
        }}
      >
        <Users
          {...defaultIconProps}
          color={
            colorScheme === colorSchemes.dark
              ? whiteColor.default
              : blackColor.default
          }
        />
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent fontFamily={Poppins.medium.default}>
          Click to share your referral link
        </TextComponent>
        <TextComponent
          fontSize={10}
          style={{
            opacity: 0.6
          }}
        >
          {userDetails.link}
        </TextComponent>
      </View>
      <Share2
        {...defaultIconProps}
        color={
          colorScheme === colorSchemes.dark
            ? whiteColor.default
            : blackColor.default
        }
      />
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10
      }}
    >
      <SkeletonLoader
        width={50}
        height={50}
        style={{
          borderRadius: 9000
        }}
      />

      <View
        style={{
          flex: 1
        }}
      >
        <SkeletonLoader />
        <SkeletonLoader width={windowWidth * 0.6} />
      </View>
    </View>
  );
};

export default ReferralCard;

const styles = StyleSheet.create({});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import {
  backgroundColor,
  primaryColor,
  redColor,
  whiteColor
} from "../assets/colors";
import ProfileImage from "@/components/_screens/_general/ProfileImage";
import { Pen } from "lucide-react-native";
import {
  defaultIconProps,
  padding,
  profileRoutes,
  windowHeight
} from "@/utils/_variables";
import ScrollComponent from "@/components/_general/ScrollComponent";
import TextComponent from "@/components/_general/TextComponent";
import { Logout } from "iconsax-react-native";
import ProfileStats from "@/components/_screens/profile/ProfileStats";
import ProfileRoute from "@/components/_screens/profile/ProfileRoute";

const Profile = () => {
  return (
    <LoggedInContainer
      hideNav
      unScrollable
      header={
        <InnerScreenHeader
          color={whiteColor.default}
          style={{
            backgroundColor: primaryColor.default
          }}
        />
      }
      contentContainerStyle={{
        backgroundColor: primaryColor.default,
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 90
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor.default,
          borderRadius: 30,
          paddingBottom: 20,
          gap: 20
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: -40
          }}
        >
          <TouchableOpacity style={{}}>
            <ProfileImage size={80} />
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: primaryColor.default,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9000,
                position: "absolute",
                bottom: 0,
                right: 0
              }}
            >
              <Pen {...defaultIconProps} color={whiteColor.default} size={13} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollComponent
          style={{
            minHeight: windowHeight - 295,
            paddingHorizontal: padding
            // backgroundColor: redColor.default
          }}
        >
          <View
            style={{
              flex: 1,
              gap: 20
            }}
          >
            <ProfileStats />
            {profileRoutes.map((data, index) => (
              <ProfileRoute {...data} key={index} />
            ))}
          </View>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: redColor.opacity600,
                borderRadius: 15,
                flexDirection: "row",
                gap: 5
              }}
            >
              <Logout {...defaultIconProps} color={whiteColor.default} />
              <TextComponent color={whiteColor.default}>Logout</TextComponent>
            </TouchableOpacity>
          </View>
        </ScrollComponent>
      </View>
    </LoggedInContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({});

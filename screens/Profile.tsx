import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import {
  backgroundColor,
  backgroundColorDark,
  blackColor,
  primaryColor,
  redColor,
  whiteColor
} from "../assets/colors";
import ProfileImage from "@/components/_screens/_general/ProfileImage";
import { Moon, Pen, SunMoon } from "lucide-react-native";
import {
  colorSchemes,
  defaultIconProps,
  padding,
  profileRoutes,
  windowHeight,
  windowWidth
} from "@/utils/_variables";
import ScrollComponent from "@/components/_general/ScrollComponent";
import TextComponent from "@/components/_general/TextComponent";
import { Logout } from "iconsax-react-native";
import ProfileStats from "@/components/_screens/profile/ProfileStats";
import ProfileRoute from "@/components/_screens/profile/ProfileRoute";
import { useActionContext } from "@/context";
import Toggle from "@/components/_general/form/Toggle";
import { LoadingOne } from "@/assets/images";
import useUser from "@/hooks/useUser";
import { showToast } from "@/localServices/function";

const Profile = () => {
  const { colorScheme, setColorScheme } = useActionContext();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { logoutUser, deleteUserRecord } = useUser();
  return (
    <>
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
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
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
                <Pen
                  {...defaultIconProps}
                  color={whiteColor.default}
                  size={13}
                />
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
              <TouchableOpacity
                onPress={() => {
                  setColorScheme(
                    colorScheme === colorSchemes.dark
                      ? colorSchemes.light
                      : colorSchemes.dark
                  );
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingVertical: 10
                }}
              >
                {colorScheme === colorSchemes.dark ? (
                  <SunMoon
                    {...defaultIconProps}
                    color={
                      colorScheme === colorSchemes.dark
                        ? whiteColor.default
                        : blackColor.default
                    }
                  />
                ) : (
                  <Moon
                    {...defaultIconProps}
                    color={
                      colorScheme === colorSchemes.dark
                        ? whiteColor.default
                        : blackColor.default
                    }
                  />
                )}
                <TextComponent
                  style={{
                    flex: 1
                  }}
                >
                  {colorScheme === colorSchemes.dark ? "Light" : "Dark"} mode
                </TextComponent>
                <Toggle
                  onChange={() => {
                    setColorScheme(
                      colorScheme === colorSchemes.dark
                        ? colorSchemes.light
                        : colorSchemes.dark
                    );
                  }}
                  active={colorScheme === colorSchemes.dark}
                />
              </TouchableOpacity>
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
                onPress={() => {
                  setLogoutLoading(true);
                  logoutUser()
                    ?.then((res) => {
                      return deleteUserRecord();
                    })
                    .catch((err) => {
                      showToast(err?.statusText || "Unable to logout user");
                    })
                    .finally(() => {
                      setLogoutLoading(false);
                    });
                }}
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
      {logoutLoading && (
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: blackColor.opacity700,
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 9
          }}
        >
          <Image
            source={LoadingOne}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain"
            }}
          />
          <TextComponent color={whiteColor.default}>
            Logging out please wait...
          </TextComponent>
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});

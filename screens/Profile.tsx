import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useState } from "react";
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
  fireStoreKeys,
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
import { useActionContext, useUserContext } from "@/context";
import Toggle from "@/components/_general/form/Toggle";
import { LoadingOne } from "@/assets/images";
import useUser from "@/hooks/useUser";
import { generateFileBlob, showToast } from "@/utils/functions";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/api/firestore";
import * as ImagePicker from "expo-image-picker";
import { processRequest } from "@/api/functions";
import { updateUserAvatarApi } from "@/api/url";
import { getColorScheme, saveColorScheme } from "@/localServices/function";
import { ColorSchemeType } from "@/utils/types";

const Profile = () => {
  const { colorScheme, setColorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { logoutUser, deleteUserRecord, fetchUserDetails } = useUser();

  const changeColorScheme = useCallback(async () => {
    setColorScheme(
      (() => {
        const newColorScheme: ColorSchemeType =
          colorScheme === colorSchemes.dark
            ? colorSchemes.light
            : colorSchemes.dark;
        saveColorScheme(newColorScheme);

        if (userDetails) {
          setDoc(
            doc(firestoreDB, fireStoreKeys.settings, userDetails.id),
            {
              colorScheme: newColorScheme
            },
            {
              merge: true
            }
          );
        }
        return newColorScheme;
      })()
    );
  }, [colorScheme]);

  const changeAvatar = useCallback(async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });

      // console.log(result);
      // result.assets[0].uri
      if (!result.canceled) {
        if (result?.assets && result?.assets[0]?.uri) {
          setAvatarUploading(true);
          const localUri = result.assets[0].uri;
          const data = new FormData();
          data.append("photo", generateFileBlob(localUri));

          processRequest(updateUserAvatarApi, data, {
            headers: {
              "content-type": "multipart/form-data"
            }
          })
            .then(() => {
              showToast("Profile image updated");
              fetchUserDetails();
            })
            .catch((err) => {
              showToast(
                err?.statusText || "Error encountered when uploading image"
              );
            })
            .finally(() => {
              setAvatarUploading(false);
            });
        } else {
          showToast("Unable to fetch image. Please select image again");
        }
      } else {
        showToast("Operation canceled by the user");
      }
    } else {
      showToast("Please enable permission for media library");
    }
  }, []);

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
            <View>
              <Pressable
                onPress={changeAvatar}
                style={{ borderRadius: 9000, overflow: "hidden" }}
              >
                <ProfileImage size={80} />
                {avatarUploading && (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: blackColor.opacity600,
                      position: "absolute",
                      borderRadius: 9000,
                      left: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      zIndex: 9
                    }}
                  >
                    <Image
                      source={LoadingOne}
                      style={{
                        width: 35,
                        height: 35,
                        resizeMode: "contain"
                      }}
                    />
                  </View>
                )}
              </Pressable>
              {!avatarUploading && (
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
              )}
            </View>
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
                onPress={changeColorScheme}
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
                  onChange={changeColorScheme}
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

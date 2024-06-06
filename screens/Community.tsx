import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { Add } from "iconsax-react-native";
import {
  colorSchemes,
  defaultIconProps,
  ScreenNames
} from "@/utils/_variables";
import { useNavigation } from "@react-navigation/native";
import InputField from "@/components/_general/form/InputField";
import { SearchIcon } from "lucide-react-native";
import CommunityPostCard from "@/components/_screens/community/CommunityPostCard";
import { useActionContext } from "@/context";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";

const Community = () => {
  const { navigate } = useNavigation();
  const { colorScheme } = useActionContext();
  return (
    <>
      <LoggedInContainer header={<InnerScreenHeader />} hideNav>
        <InputField
          inputStyle={{
            borderWidth: 0,
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity50
                : blackColor.opacity50,
            paddingVertical: 10
          }}
          placeholder="Search post"
          leftIcon={
            <SearchIcon
              {...defaultIconProps}
              color={
                colorScheme === colorSchemes.dark
                  ? whiteColor.default
                  : blackColor.default
              }
            />
          }
        />

        {new Array(6).fill(0).map((_, index) => (
          <CommunityPostCard key={index} />
        ))}
      </LoggedInContainer>

      <TouchableOpacity
        onPress={() => {
          navigate(ScreenNames.CreateCommunityPost.name as never);
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: primaryColor.default,
          borderRadius: 900,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 30,
          bottom: 30
        }}
      >
        <Add {...defaultIconProps} color={whiteColor.default} size={30} />
      </TouchableOpacity>
    </>
  );
};

export default Community;

const styles = StyleSheet.create({});

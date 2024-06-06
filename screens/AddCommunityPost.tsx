import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import { useActionContext } from "@/context";
import { colorSchemes } from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";

const AddCommunityPost = () => {
  const { colorScheme } = useActionContext();
  return (
    <LoggedInContainer
      contentContainerStyle={{
        gap: 20
      }}
      hideNav
      header={<InnerScreenHeader />}
    >
      <InputField
        label="Post title"
        inputStyle={{
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity50,
          paddingVertical: 13
        }}
        placeholder="Enter title"
      />
      <InputField
        label="Your post"
        inputStyle={{
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity50,
          paddingVertical: 13,
          height: 150,
          textAlignVertical: "top"
        }}
        placeholder="Enter post"
        multiline
      />
      <Button type="primary">
        <TextComponent textAlign="center" color={whiteColor.default}>
          Post
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default AddCommunityPost;

const styles = StyleSheet.create({});

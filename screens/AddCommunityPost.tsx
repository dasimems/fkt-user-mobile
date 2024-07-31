import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import { useActionContext, useUserContext } from "@/context";
import { colorSchemes, fireStoreKeys } from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import Button from "@/components/_general/Button";
import TextComponent from "@/components/_general/TextComponent";
import { CommunityPostType } from "@/api/index.d";
import { showToast, validateValues } from "@/utils/functions";
import { Poppins } from "@/assets/fonts";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/api/firestore";
import { useNavigation } from "@react-navigation/native";

const date = Date;

const AddCommunityPost = () => {
  const { goBack } = useNavigation();
  const { colorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  const initialValue: CommunityPostType = {
    title: "",
    post: "",
    createdAt: Date.now(),
    userId: userDetails?.id || "",
    likes: [],
    comments: [],
    views: [],
    id: ""
  };
  const [postForm, setPostForm] = useState<CommunityPostType>(initialValue);
  const [postFormErr, setPostFormErr] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const postData = useCallback(async () => {
    const errors = validateValues(postForm, {
      title: {
        required: {
          value: true,
          message: "Please provide your post title"
        },
        maxLength: {
          value: 100,
          message: "Your title must not exceed more than 100 characters"
        }
      },
      post: {
        required: {
          value: true,
          message: "Please provide your post content"
        },
        maxLength: {
          value: 500,
          message: "Your post must not exceed more than 500 characters"
        }
      }
    });

    if (userDetails) {
      if (errors) {
        setPostFormErr((prevState) => ({
          ...prevState,
          ...errors
        }));
      }
      if (!errors) {
        setLoading(true);
        const postId = `${userDetails.id}-time-${date.now()}`;
        const postDetails: CommunityPostType = {
          ...postForm,
          createdAt: Date.now(),
          userId: userDetails.id,
          id: postId
        };
        const postRef = doc(firestoreDB, fireStoreKeys.post, postId);
        setDoc(postRef, postDetails, { merge: true })
          .then((res) => {
            showToast("You post have been added successfully");
            goBack();
          })
          .catch((err) => {
            showToast(
              err?.message ||
                "Error encountered when posting data! Please try again"
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

    if (!userDetails) {
      showToast("Unable to process request");
    }
  }, [postForm, userDetails]);
  return (
    <LoggedInContainer
      contentContainerStyle={{
        gap: 20
      }}
      hideNav
      header={<InnerScreenHeader />}
    >
      <InputField
        rightIcon={
          <View
            style={{
              ...styles.rightIconButtonStyle
            }}
          >
            <TextComponent
              fontSize={11}
              style={{
                opacity: 0.6
              }}
            >
              {postForm.title.length}
            </TextComponent>
            <TextComponent fontSize={11} fontFamily={Poppins.medium.default}>
              /100
            </TextComponent>
          </View>
        }
        label="Post title"
        inputStyle={{
          ...styles.inputStyle,
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity50,
          paddingVertical: 13
        }}
        placeholder="Enter title"
        value={postForm.title}
        error={postFormErr.title}
        onChangeText={(title) => {
          setPostForm((prevState) => ({
            ...prevState,
            title
          }));
          setPostFormErr((prevState) => ({
            ...prevState,
            title: ""
          }));
        }}
      />
      <InputField
        rightIconStyle={{
          justifyContent: "flex-end",
          paddingBottom: 10
        }}
        rightIcon={
          <View
            style={{
              ...styles.rightIconButtonStyle
            }}
          >
            <TextComponent
              fontSize={11}
              style={{
                opacity: 0.6
              }}
            >
              {postForm.post.length}
            </TextComponent>
            <TextComponent fontSize={11} fontFamily={Poppins.medium.default}>
              /500
            </TextComponent>
          </View>
        }
        label="Your post"
        inputStyle={{
          ...styles.inputStyle,
          backgroundColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity50,
          paddingVertical: 13,
          height: 150,
          textAlignVertical: "top",
          paddingRight: 10,
          paddingBottom: 25
        }}
        placeholder="Enter post"
        multiline
        value={postForm.post}
        error={postFormErr.post}
        onChangeText={(post) => {
          setPostForm((prevState) => ({
            ...prevState,
            post
          }));
          setPostFormErr((prevState) => ({
            ...prevState,
            post: ""
          }));
        }}
      />
      <Button loading={loading} action={postData} type="primary">
        <TextComponent textAlign="center" color={whiteColor.default}>
          Post
        </TextComponent>
      </Button>
    </LoggedInContainer>
  );
};

export default AddCommunityPost;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 0
  },
  rightIconButtonStyle: {
    flexDirection: "row"
  }
});

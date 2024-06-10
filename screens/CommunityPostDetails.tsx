import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import { primaryColor, whiteColor } from "@/assets/colors";
import { blackColor } from "../assets/colors";
import { useActionContext, useUserContext } from "@/context";
import {
  colorSchemes,
  defaultIconProps,
  fireStoreKeys
} from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { EyeSlash, Send2 } from "iconsax-react-native";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import ScrollComponent from "@/components/_general/ScrollComponent";
import CommentCard from "@/components/_screens/community-post-details/CommentCard";
import {
  useRoute,
  useIsFocused,
  useNavigation
} from "@react-navigation/native";
import {
  CommunityPostType,
  FetchedCommunityPostType,
  PostCommentType,
  PostContentType
} from "@/api/index.d";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  Unsubscribe
} from "firebase/firestore";
import { firestoreDB } from "@/api/firestore";
import { FireStoreDetailsType } from "@/reducers/userReducer";
import SomethingWentWrongContainer from "@/components/_layouts/SomethingWentWrongContainer";
import { Image } from "react-native";
import { LoadingTwo } from "@/assets/images";
import moment from "moment";
import { showToast } from "@/utils/functions";
import EmptyContainer from "@/components/_layouts/EmptyContainer";

const CommunityPostDetails = () => {
  const { colorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const [lastListener, setLastListener] = useState<Unsubscribe | null>(null);
  const { id } = params as { id?: string };
  const [error, setError] = useState<string | null>(null);
  const [postDetails, setPostDetails] =
    useState<FetchedCommunityPostType | null>(null);
  const [post, setPost] = useState<CommunityPostType | null>(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const unsub = onSnapshot(
            doc(firestoreDB, fireStoreKeys.post, id),
            async (doc) => {
              if (doc.exists()) {
                const postData = doc.data() as CommunityPostType;
                setPost((prevState) =>
                  prevState ? { ...prevState, ...postData } : { ...postData }
                );

                setPostDetails((prevState) =>
                  prevState ? { ...prevState, ...postData } : prevState
                );
              }

              if (!doc.exists()) {
                setError("Post doesn't exist or is deleted!");
              }
            }
          );

          setLastListener((prevState) => {
            if (prevState) {
              prevState();
            }

            return unsub;
          });
        } catch (error) {
          setError("Unknown Error encountered when fetching post details");
        }
      }
    })();

    if (!id) {
      goBack();
    }
  }, [id, isFocused]);

  useEffect(() => {
    (async () => {
      if (post) {
        if (!postDetails) {
          try {
            const userDetailsRef = doc(
              firestoreDB,
              fireStoreKeys.users,
              post.userId
            );
            const userDetails = await getDoc(userDetailsRef);
            let postData = {
              ...post
            } as FetchedCommunityPostType;

            if (userDetails.exists()) {
              const user = userDetails.data() as FireStoreDetailsType;

              postData = {
                ...postData,
                avatar: user.avatar,
                userPersonalName: user.name
              };
            }

            setPostDetails(postData);
          } catch (error) {
            setError("Error encountered when fetching author details");
          }
        }
      }
    })();
  }, [post, postDetails]);

  const updatePostDetails = useCallback(
    async (data: CommunityPostType, func?: () => void) => {
      if (postDetails) {
        const postRef = doc(firestoreDB, fireStoreKeys.post, postDetails.id);
        return setDoc(postRef, data, { merge: true });
      }
    },
    [postDetails]
  );

  const processLike = useCallback(async () => {
    if (
      userDetails &&
      postDetails &&
      postDetails.likes &&
      Array.isArray(postDetails.likes)
    ) {
      setLikeLoading(true);
      let newLike: PostContentType[] = [];
      const postRef = doc(firestoreDB, fireStoreKeys.post, postDetails.id);
      const fetchedPost = await getDoc(postRef);
      const isLikedByUser = postDetails.likes.find(
        (details) => details.userId === userDetails.id
      );

      if (fetchedPost.exists()) {
        const fetchedPostDetails = fetchedPost.data() as CommunityPostType;
        if (isLikedByUser) {
          newLike = fetchedPostDetails.likes.filter(
            (details) => details.userId !== userDetails.id
          );
        }

        if (!isLikedByUser) {
          newLike = [
            ...fetchedPostDetails.likes,
            {
              userId: userDetails.id,
              id: `${userDetails.id}-${Date.now()}`,
              postId: postDetails.id,
              createdAt: new Date()
            }
          ];
        }
        updatePostDetails({ ...postDetails, likes: newLike })
          .then(() => {
            showToast(
              `You've successfully ${
                isLikedByUser ? "disliked" : "liked"
              } this post`
            );
          })
          .catch((err) => {
            showToast(
              "Error encountered when liking this post. Please try again"
            );
          })
          .finally(() => {
            setLikeLoading(false);
          });
      }

      if (!fetchedPost.exists()) {
        setError("This post have been deleted!");
      }
    }
  }, [userDetails, postDetails]);

  const postComment = useCallback(
    async (comment: string) => {
      if (postDetails && userDetails && Array.isArray(postDetails.comments)) {
        const postRef = doc(firestoreDB, fireStoreKeys.post, postDetails.id);
        const fetchedPost = await getDoc(postRef);

        if (fetchedPost.exists()) {
          const fetchedPostDetails = fetchedPost.data() as CommunityPostType;
          const commentData: PostCommentType = {
            userId: userDetails.id,
            id: `${userDetails.id}-${Date.now()}`,
            postId: postDetails.id,
            createdAt: new Date(),
            comment
          };

          const newComments: PostCommentType[] = [
            ...fetchedPostDetails.comments,
            commentData
          ];
          updatePostDetails({ ...fetchedPostDetails, comments: newComments })
            .then((res) => {
              showToast("Hooray. Your comment have been posted!");
            })
            .catch(() => {
              showToast("Error posting comment!, Please try again");
            });
        }

        if (!fetchedPost.exists()) {
          setError("This post have been deleted!");
        }
      }
    },
    [userDetails, postDetails]
  );

  useEffect(() => {
    if (
      postDetails &&
      postDetails?.views &&
      Array.isArray(postDetails?.views) &&
      userDetails
    ) {
      const isViewedByUser = postDetails.views.find(
        (details) => details.userId === userDetails.id
      );

      if (!isViewedByUser) {
        try {
          const views = [
            ...postDetails.views,
            {
              userId: userDetails.id,
              id: `${userDetails.id}-${Date.now()}`,
              postId: postDetails.id,
              createdAt: new Date()
            }
          ];
          updatePostDetails({ ...postDetails, views }).catch(() => {
            showToast("Error updating post details");
          });
        } catch (error) {}
      }
    }
  }, [postDetails, isFocused, userDetails]);

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
      {postDetails && !error && (
        <>
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
                <TextComponent
                  fontSize={20}
                  fontFamily={Poppins.semiBold.default}
                >
                  {postDetails?.title}
                </TextComponent>

                <View
                  style={{
                    opacity: 0.6,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20
                  }}
                >
                  <TextComponent fontSize={13}>
                    {moment(postDetails?.createdAt).format("DD-MM-YYYY")}
                  </TextComponent>
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
                    <TextComponent>
                      {postDetails?.views?.length || 0}
                    </TextComponent>
                  </View>
                </View>

                <TextComponent>{postDetails?.post}</TextComponent>
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
                  <TextComponent>
                    {postDetails?.comments?.length || 0}
                  </TextComponent>
                </View>

                {postDetails.comments.length < 1 && (
                  <EmptyContainer text="No comment at the present moment. Be the first one by typing and posting a comment below" />
                )}

                {postDetails.comments.length > 0 && (
                  <View
                    style={{
                      gap: 20
                    }}
                  >
                    {postDetails.comments.map((data, index) => (
                      <CommentCard
                        {...data}
                        isSender={data.userId === userDetails?.id}
                        key={data.id}
                      />
                    ))}
                  </View>
                )}
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
              value={comment}
              onChangeText={(value) => {
                setComment(value);
              }}
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
            <TouchableOpacity
              onPress={() => {
                postComment(comment);
                setComment("");
              }}
            >
              <Send2
                {...defaultIconProps}
                color={primaryColor.default}
                size={30}
                variant="Bold"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      {!postDetails && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 4
          }}
        >
          <Image
            source={LoadingTwo}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain"
            }}
          />
          <TextComponent
            style={{
              opacity: 0.6
            }}
          >
            Fetching post...
          </TextComponent>
        </View>
      )}

      {error && (
        <SomethingWentWrongContainer
          text={error}
          containerStyle={{
            flex: 1
          }}
        />
      )}
    </LoggedInContainer>
  );
};

export default CommunityPostDetails;

const styles = StyleSheet.create({});

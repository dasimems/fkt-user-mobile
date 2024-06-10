import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { Add } from "iconsax-react-native";
import {
  colorSchemes,
  defaultIconProps,
  fireStoreKeys,
  ScreenNames
} from "@/utils/_variables";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import InputField from "@/components/_general/form/InputField";
import { SearchIcon } from "lucide-react-native";
import CommunityPostCard from "@/components/_screens/community/CommunityPostCard";
import { useActionContext } from "@/context";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import { CommunityPostType, FetchedCommunityPostType } from "@/api/index.d";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestoreDB } from "@/api/firestore";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import ScrollComponent from "@/components/_general/ScrollComponent";
import SomethingWentWrongContainer from "@/components/_layouts/SomethingWentWrongContainer";
import { FireStoreDetailsType } from "@/reducers/userReducer";

const Community = () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const { colorScheme } = useActionContext();
  const [searchText, setSearchText] = useState("");
  const [postList, setPostList] = useState<FetchedCommunityPostType[] | null>(
    null
  );
  const [errorFetchingPost, setErrorFetchingPost] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestoreDB, fireStoreKeys.post)
        );
        let postData: CommunityPostType[] = [];
        querySnapshot.forEach((doc) => {
          const details = doc.data() as CommunityPostType;
          postData = [...postData, details];
        });
        const userDataPromise = await Promise.all(
          postData.map((data) =>
            getDoc(doc(firestoreDB, fireStoreKeys.users, data.userId))
          )
        );
        const fetchedUserData = userDataPromise.map((sentDoc) =>
          sentDoc.exists() ? sentDoc.data() : undefined
        ) as (FireStoreDetailsType | undefined)[];
        const data = postData.map((data) => {
          const userData = fetchedUserData.find(
            (userInfo) => userInfo && data.userId === userInfo.id
          );
          const postInformation: FetchedCommunityPostType = {
            ...data,
            avatar: userData?.avatar || "",
            userPersonalName: userData?.name || ""
          };
          return postInformation;
        });
        setPostList(data);
      } catch (error) {
        setErrorFetchingPost(true);
      }
    })();
  }, [isFocused]);
  return (
    <>
      <LoggedInContainer
        header={<InnerScreenHeader />}
        hideNav
        unScrollable
        contentContainerStyle={{
          flex: 1
        }}
      >
        {postList && (
          <>
            <InputField
              value={searchText}
              onChangeText={(value) => {
                setSearchText(value);
              }}
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

            {postList.length < 1 && (
              <EmptyContainer
                containerStyle={{
                  flex: 1
                }}
                text="No post found"
              />
            )}

            {postList.length > 0 &&
              postList.filter((data) => new RegExp(searchText).test(data.title))
                .length < 1 && (
                <EmptyContainer
                  containerStyle={{
                    flex: 1
                  }}
                  text={`No result found for "${searchText}"`}
                />
              )}

            {postList.length > 0 &&
              postList.filter((data) => new RegExp(searchText).test(data.title))
                .length > 0 && (
                <ScrollComponent
                  style={{
                    minHeight: 0
                  }}
                >
                  {postList.length > 0 &&
                    postList
                      .filter((data) => new RegExp(searchText).test(data.title))
                      .map((data) => (
                        <CommunityPostCard {...data} key={data.id} />
                      ))}
                </ScrollComponent>
              )}
          </>
        )}

        {errorFetchingPost && (
          <SomethingWentWrongContainer
            text="Error fetching posts"
            containerStyle={{
              flex: 1
            }}
          />
        )}

        {!postList &&
          !errorFetchingPost &&
          new Array(6).fill(0).map((_, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 10,
                paddingTop: 20
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
                  gap: 3
                }}
              >
                <SkeletonLoader
                  style={{
                    width: "100%"
                  }}
                />

                {new Array(4).fill(0).map(() => (
                  <SkeletonLoader
                    style={{
                      width: "100%",
                      height: 10
                    }}
                  />
                ))}
              </View>
            </View>
          ))}
      </LoggedInContainer>

      {postList && (
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
      )}
    </>
  );
};

export default Community;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import { Search } from "lucide-react-native";
import {
  defaultIconProps,
  colorSchemes,
  windowWidth
} from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import ChatCard from "@/components/_screens/chats/ChatCard";
import { AvatarImage } from "@/assets/images";
import { useActionContext, useUserContext } from "@/context";
import useChatContext from "@/context/ChatContext";
import { ChatProfilesType } from "@/reducers/chatReducer";
import useChat from "@/hooks/useChat";
import useUser from "@/hooks/useUser";
import SomethingWentWrongContainer from "@/components/_layouts/SomethingWentWrongContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import { EmptyChatsLottieAnimation } from "@/assets/lottie";
import moment from "moment";

const Chats = () => {
  const { colorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  const { chatProfiles, chats } = useChatContext();
  const [search, setSearch] = useState("");
  const { getChats } = useChat();
  const { fetchUserDetails } = useUser();
  const [chatError, setChatError] = useState(false);
  const [userChats, setUserChats] = useState<ChatProfilesType[]>([]);

  useEffect(() => {
    if (chatProfiles) {
      // console.log(chatProfiles);
      if (search) {
        const regex = new RegExp(search, "i");
        setUserChats(
          chatProfiles.filter((profile) => regex.test(profile.name))
        );
      } else {
        setUserChats(chatProfiles);
      }
    }
  }, [chatProfiles, search]);

  useEffect(() => {
    if (userDetails) {
      const chatKeys = Object.keys(chats);
      if (chatKeys.length < 1) {
        getChats();
      }
    } else {
      fetchUserDetails();
    }
  }, [chats]);
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 30,
        minHeight: userChats.length < 1 || chatError ? "100%" : 0
      }}
    >
      {userChats.length > 0 && (
        <InputField
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
          placeholder="Search with name"
          rightIcon={
            <Search
              {...defaultIconProps}
              size={20}
              color={
                colorScheme === colorSchemes.dark
                  ? whiteColor.opacity600
                  : blackColor.opacity600
              }
            />
          }
          inputStyle={{
            backgroundColor:
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity100
                : whiteColor.default,
            paddingVertical: 10
          }}
        />
      )}
      <View
        style={{
          flex: userChats.length < 1 || chatError ? 1 : undefined
        }}
      >
        {chatError ? (
          <SomethingWentWrongContainer />
        ) : chatProfiles ? (
          userChats.length < 1 ? (
            <EmptyContainer
              containerStyle={{
                flex: 1,
                height: "100%"
              }}
              animation={EmptyChatsLottieAnimation}
              text="You have no chats at the present moment"
            />
          ) : (
            userChats.map(
              ({ avatar, id, lastMessage, name, unReadMessages }, index) => (
                <ChatCard
                  unReadMessages={unReadMessages}
                  isOnline={true}
                  sender={{
                    name,
                    id,
                    image: avatar || ""
                  }}
                  lastSentMessage={{
                    message: lastMessage.message,
                    time: moment(new Date(lastMessage.date)).format("hh:mm a")
                  }}
                />
              )
            )
          )
        ) : (
          <View
            style={{
              gap: 20
            }}
          >
            {new Array(10).fill(0).map((_, index) => (
              <View
                key={index}
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
                    flex: 1,
                    gap: 7
                  }}
                >
                  <SkeletonLoader />
                  <SkeletonLoader width={windowWidth * 0.5} />
                </View>

                <SkeletonLoader width={20} />
              </View>
            ))}
          </View>
        )}
      </View>
    </LoggedInContainer>
  );
};

export default Chats;

const styles = StyleSheet.create({});

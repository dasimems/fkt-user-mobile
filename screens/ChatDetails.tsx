import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import Image from "@/components/_general/Image";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Menu } from "react-native-paper";
import { Ban, Flag, MoreVertical, Send, Trash2 } from "lucide-react-native";
import {
  colorSchemes,
  defaultIconProps,
  fireStoreKeys,
  padding,
  windowWidth
} from "@/utils/_variables";
import HeaderDropdownButton from "@/components/_general/HeaderDropdownButton";
import { AvatarImage } from "@/assets/images";
import InputField from "@/components/_general/form/InputField";
import ScrollComponent from "@/components/_general/ScrollComponent";
import ChatDetailsCard from "@/components/_screens/chats/ChatDetailsCard";
import { ArrowLeft2 } from "iconsax-react-native";
import { useActionContext, useUserContext } from "@/context";
import useChatContext from "@/context/ChatContext";
import useChat from "@/hooks/useChat";
import { ChatDetailsType, ChatsType } from "@/reducers/chatReducer";
import SomethingWentWrongContainer from "@/components/_layouts/SomethingWentWrongContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { ifCloseToTop, showToast } from "@/localServices/function";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/api/firestore";
import moment from "moment";
import EmptyContainer from "@/components/_layouts/EmptyContainer";

const ChatHeader: React.FC<{
  image: ImageSourcePropType;
  name: string;
  lastSeen: string;
  id: string;
  isOnline?: boolean;
  imageUrl?: string;
}> = ({ image, name, lastSeen, id, isOnline, imageUrl }) => {
  const defaultBorderRadius = 30;
  const defaultIconSize = 25;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const { colorScheme } = useActionContext();
  const { goBack } = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: padding
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderBottomWidth: 1,
          paddingVertical: 20,
          borderColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft2
            {...defaultIconProps}
            size={30}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.default
                : blackColor.default
            }
          />
        </TouchableOpacity>
        <View>
          <Image
            url={imageUrl || undefined}
            image={image}
            type="round"
            innerPadding={3}
            imageStyle={{
              borderRadius: 9000
            }}
          />
          {isOnline && (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: primaryColor.default,
                borderRadius: 9000,
                position: "absolute",
                right: 0,
                bottom: 4
              }}
            ></View>
          )}
        </View>
        <View
          style={{
            flex: 1
          }}
        >
          <TextComponent fontFamily={Poppins.semiBold.default}>
            {name}
          </TextComponent>
          <TextComponent style={{ opacity: 0.6 }}>{lastSeen}</TextComponent>
        </View>

        <View>
          <Menu
            contentStyle={{
              top: defaultIconSize + 10,
              backgroundColor: whiteColor.default,
              borderRadius: 15
            }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                {
                  <MoreVertical
                    {...defaultIconProps}
                    size={defaultIconSize}
                    color={
                      colorScheme === colorSchemes.dark
                        ? whiteColor.opacity600
                        : blackColor.opacity600
                    }
                  />
                }
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title={<HeaderDropdownButton Icon={Trash2} label="Delete" />}
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title={<HeaderDropdownButton Icon={Ban} label="Block" />}
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
              }}
              title={<HeaderDropdownButton Icon={Flag} label="Report" />}
            />
          </Menu>
        </View>
      </View>
    </View>
  );
};

let defaultCount = 15;

const ChatDetails = () => {
  const {
    params
  }: {
    params?: {
      id?: string;
      avatar?: string;
      name?: string;
    };
  } = useRoute();
  const { goBack } = useNavigation();
  const { chats } = useChatContext();
  const { getChat } = useChat();
  const { userDetails } = useUserContext();
  const [userChatError, setUserChatError] = useState(false);
  const [userChats, setUserChats] = useState<ChatsType[] | null>(null);
  const [chatChannel, setChatChannel] = useState<string | null>(null);
  const [chatCount, setChatCount] = useState(defaultCount);
  const [chatContent, setChatContent] = useState("");
  const scrollComponentRef = useRef<ScrollView>(null);

  const sendChat = useCallback(async () => {
    if (chatContent) {
      if (chatChannel && params?.id && userDetails) {
        let previousChat: ChatsType[] = userChats || [];
        const data: ChatDetailsType = {
          date: Date.now(),
          channel: chatChannel,
          users: [params.id, userDetails.id],
          chats: [
            ...previousChat,
            {
              date: Date.now(),
              message: chatContent,
              receiverId: params.id,
              senderId: userDetails.id,
              id: `${userDetails.id}-${Date.now()}`,
              isDeleted: null,
              isRead: null
            }
          ]
        };
        try {
          setChatContent("");
          await setDoc(
            doc(firestoreDB, fireStoreKeys.chats, chatChannel),
            data,
            { merge: true }
          );
          setUserChats(data.chats);
        } catch (error) {
          showToast("Error encountered whilst sending message");
        }
      } else {
        showToast("Invalid channel detected");
      }
    }
  }, [chatChannel, chatContent, userChats, params, userDetails]);

  const scrollToBottom = () => {
    if (scrollComponentRef.current) {
      scrollComponentRef.current.scrollToEnd();
    }
  };

  useEffect(() => {
    if (!params?.name || !params?.id) {
      goBack();
    }
  }, [params]);

  useEffect(() => {
    if (params?.id) {
      getChat(params?.id)
        .then((res) => {
          const channel = res.channel;
          const chat = res.chat;
          setChatChannel(channel);
          setUserChats(chat);
        })
        .catch(() => {
          setUserChatError(true);
        });
    }
  }, [chats, params]);

  useEffect(() => {
    if (userChats) {
      setTimeout(scrollToBottom);
    }
  }, [userChats]);
  return (
    <LoggedInContainer
      unScrollable
      hideNav
      header={
        <ChatHeader
          name={params?.name || ""}
          id={params?.id || ""}
          image={AvatarImage}
          imageUrl={params?.avatar}
          lastSeen="Just now"
        />
      }
      contentContainerStyle={{
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 0
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        {userChatError ? (
          <SomethingWentWrongContainer />
        ) : userChats ? (
          userChats.length < 1 ? (
            <EmptyContainer
              containerStyle={{
                flex: 1
              }}
              text="You have no conversation with this person at the present moment. Please send a message to start a chat"
            />
          ) : (
            <ScrollComponent
              ref={scrollComponentRef}
              onScroll={(e) => {
                if (ifCloseToTop(e)) {
                  setChatCount((prevState) =>
                    prevState + defaultCount >= userChats.length
                      ? userChats.length
                      : prevState + defaultCount
                  );
                }
              }}
              style={{
                minHeight: 0,
                paddingVertical: 20,
                paddingHorizontal: padding,
                gap: 2
              }}
            >
              {userChats
                .slice(
                  userChats.length - chatCount > 0
                    ? userChats.length - chatCount
                    : 0
                )
                .map(({ date, message, senderId }, index) => (
                  <ChatDetailsCard
                    key={index}
                    message={message}
                    time={moment(new Date(date)).format("DD/MM/YYYY hh:mm a")}
                    isSender={senderId === userDetails?.id}
                  />
                ))}
            </ScrollComponent>
          )
        ) : (
          <View
            style={{
              flex: 1,
              gap: 20
            }}
          >
            {new Array(6).fill(0).map((_, index) => (
              <View
                key={index}
                style={{
                  flexDirection: index % 2 === 0 ? "row-reverse" : "row",
                  width: "100%",
                  paddingHorizontal: padding
                }}
              >
                <SkeletonLoader width={windowWidth * 0.5} height={100} />
              </View>
            ))}
          </View>
        )}
      </View>

      <View
        style={{
          paddingHorizontal: padding,
          paddingBottom: 20
        }}
      >
        <InputField
          multiline
          value={chatContent}
          onChangeText={(value) => {
            setChatContent(value);
          }}
          inputStyle={{
            paddingVertical: 8,
            borderRadius: 25,
            textAlignVertical: "top",
            maxHeight: 150
          }}
          rightIconAction={sendChat}
          rightIcon={
            <Send
              {...defaultIconProps}
              color={
                chatContent.length > 0
                  ? primaryColor.default
                  : primaryColor.opacity600
              }
            />
          }
          rightIconStyle={{
            paddingHorizontal: 15
          }}
          placeholder="Type your message here..."
        />
      </View>
    </LoggedInContainer>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({});

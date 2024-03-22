import { firestoreDB } from "@/api/firestore";
import { useUserContext } from "@/context";
import useChatContext from "@/context/ChatContext";
import { showToast } from "@/localServices/function";
import {
  ChatContentType,
  ChatDetailsType,
  ChatProfilesType,
  ChatsType
} from "@/reducers/chatReducer";
import { FireStoreDetailsType } from "@/reducers/userReducer";
import { channelConnector, fireStoreKeys } from "@/utils/_variables";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useCallback } from "react";

const useChat = () => {
  const { setChats, chats, chatProfiles, setChatProfiles } = useChatContext();
  const { userDetails } = useUserContext();
  const getChats = useCallback(async () => {
    if (userDetails) {
      const regex = new RegExp(userDetails.id, "i");
      let availableChatProfiles = chatProfiles || [];
      let profiles = [...availableChatProfiles];

      onSnapshot(
        collection(firestoreDB, fireStoreKeys.chats),
        (snapshot) => {
          snapshot.forEach(async (document) => {
            const data: ChatDetailsType = document.data() as ChatDetailsType;
            const channel = data.channel || "";
            const users = data.users || [];
            if (data && channel && regex.test(channel)) {
              const expectedData: ChatContentType = {
                [channel]: data
              };

              const secondUser = users.find((id) => id !== userDetails.id);

              if (secondUser) {
                let expectedProfile: ChatProfilesType = {
                  lastMessage: data.chats[data.chats.length - 1],
                  name: "User",
                  unReadMessages: data.chats.filter((chat) => !chat.isRead)
                    .length,
                  id: secondUser,
                  avatar: null
                };

                const docRef = doc(
                  firestoreDB,
                  fireStoreKeys.users,
                  secondUser
                );
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  const data = docSnap.data() as FireStoreDetailsType;
                  expectedProfile = {
                    ...expectedProfile,
                    avatar: data.avatar || null,
                    id: data.id || secondUser,
                    name: data.name || "User"
                  };
                }
                if (
                  profiles.find((profile) => profile.id === expectedProfile.id)
                ) {
                  profiles = profiles.map((profile) =>
                    profile.id === expectedProfile.id
                      ? expectedProfile
                      : profile
                  );
                } else {
                  profiles = [...profiles, expectedProfile];
                }
                setChatProfiles(profiles);
              }
              setChats(expectedData);
              profiles.sort(function (a, b) {
                return b.lastMessage.date - a.lastMessage.date;
              });
              setChatProfiles(profiles);
            }
          });
        },
        (error) => {
          showToast("Error encountered when fetching user chats");
        }
      );

      setChatProfiles(profiles);
    }
  }, [userDetails]);
  const getChat = useCallback(
    (receiverId: string) => {
      return new Promise<{ channel: string; chat: ChatsType[] }>((res, rej) => {
        if (chats && userDetails) {
          const chatKeys = Object.keys(chats);
          const regex = new RegExp(receiverId, "i");
          const chatKey = chatKeys.find((key) => regex.test(key));

          let chat: ChatsType[] = [];

          if (chatKey) {
            chat = chats[chatKey].chats;
          }

          res({
            channel:
              chatKey || `${userDetails.id}${channelConnector}${receiverId}`,
            chat
          });
        } else {
          rej({
            message: "Error fetching chat details"
          });
        }
      });
    },
    [chats, userDetails]
  );
  return { getChat, getChats };
};

export default useChat;

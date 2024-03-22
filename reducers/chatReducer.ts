import { ChatType, SET_CHAT_PROFILES, SET_CHATS } from "@/utils/_enums";

export interface ChatsType {
  message: string;
  id?: string;
  isDeleted?: number | null;
  isRead?: number | null;
  date: number;
  senderId: string;
  receiverId: string;
}

export interface ChatDetailsType {
  chats: ChatsType[];
  date: number;
  users: string[];
  channel: string;
}

export interface ChatContentType {
  [chatChannel: string]: ChatDetailsType;
}
export interface ChatProfilesType {
  lastMessage: ChatsType;
  unReadMessages: number;
  name: string;
  avatar: string | null;
  id: string;
}

export interface InitialValueType {
  chatProfiles: ChatProfilesType[] | null;
  chats: ChatContentType;
}

export const initialValue: InitialValueType = {
  chatProfiles: null,
  chats: {}
};

export const reducer = (
  state: InitialValueType,
  action: { type: ChatType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_CHATS:
      return { ...state, chats: { ...state.chats, ...payload } };
    case SET_CHAT_PROFILES:
      return { ...state, chatProfiles: payload };
    default:
      return state;
  }
};

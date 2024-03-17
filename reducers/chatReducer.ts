import { ChatType } from "@/utils/_enums";

export interface ChatDetailsType {
  message: string;
  id?: string;
  isDeleted?: boolean;
  isRead?: boolean;
  date: Date;
  senderId: string;
  receiverId: string;
}
export interface ChatProfilesType {
  lastMessage: string;
}

interface InitialValueType {
  chatKeys: string[] | null;
  chats: { [chatChannel: string]: ChatDetailsType[] };
  //   chatProfiles: {}
}

export const initialValue: InitialValueType = {
  chatKeys: null,
  chats: {}
};

export const reducer = (
  state: InitialValueType,
  action: { type: ChatType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

import { StyleSheet } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { chatInitialValue, chatReducer } from "@/reducers";
import { FormProviderTypes } from "@/utils/types";
import {
  SET_CHAT_PROFILES,
  SET_CHATS,
  SET_PASSWORD,
  SET_PHONE_NUMBER,
  SET_PIN
} from "@/utils/_enums";
import { InitialValueType } from "@/reducers/chatReducer";
import { ChatContentType, ChatProfilesType } from "@/reducers/chatReducer";

interface FormContextActions {
  setChatProfiles: (payload: ChatProfilesType[]) => void;
  setChats: (payload: ChatContentType) => void;
}

const ChatContext = createContext<InitialValueType & FormContextActions>({
  ...chatInitialValue,
  setChatProfiles: () => {},
  setChats: () => {}
});

export const ChatProvider: React.FC<FormProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, chatInitialValue);

  const setChatProfiles = useCallback((payload: ChatProfilesType[] = []) => {
    dispatch({
      type: SET_CHAT_PROFILES,
      payload
    });
  }, []);
  const setChats = useCallback((payload: ChatContentType = {}) => {
    dispatch({
      type: SET_CHATS,
      payload
    });
  }, []);

  return (
    <ChatContext.Provider value={{ ...state, setChatProfiles, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export default useChatContext;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { actionInitialValue, actionReducer } from "@/reducers";
import { ActionProviderTypes } from "@/utils/types";
import { SET_COLOR_SCHEME } from "@/utils/_enums";

const ActionContext = createContext({
  ...actionInitialValue,
  setColorScheme: (payload?: string): void => {}
});

export const ActionProvider: React.FC<ActionProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, actionInitialValue);
  const colorScheme = useColorScheme();

  const setColorScheme = useCallback(
    (payload?: string): void => {
      dispatch({
        type: SET_COLOR_SCHEME,
        payload: payload || colorScheme
      });
    },
    [colorScheme]
  );

  return (
    <ActionContext.Provider value={{ ...state, setColorScheme }}>
      {children}
    </ActionContext.Provider>
  );
};

const useActionContext = () => {
  return useContext(ActionContext);
};

export default useActionContext;

const styles = StyleSheet.create({});

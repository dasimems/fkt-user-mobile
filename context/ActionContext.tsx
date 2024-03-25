import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import { actionInitialValue, actionReducer } from "@/reducers";
import { ActionProviderTypes, ColorSchemeType } from "@/utils/types";
import { APP_LOADED, SET_COLOR_SCHEME } from "@/utils/_enums";

const ActionContext = createContext({
  ...actionInitialValue,
  setColorScheme: (payload?: ColorSchemeType): void => {},
  setAppLoaded: (): void => {}
});

export const ActionProvider: React.FC<ActionProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, actionInitialValue);
  const colorScheme = useColorScheme();

  const setColorScheme = useCallback(
    (payload?: ColorSchemeType): void => {
      dispatch({
        type: SET_COLOR_SCHEME,
        payload: payload || colorScheme
      });
    },
    [colorScheme]
  );
  const setAppLoaded = useCallback((): void => {
    dispatch({
      type: APP_LOADED,
      payload: true
    });
  }, [colorScheme]);

  return (
    <ActionContext.Provider value={{ ...state, setColorScheme, setAppLoaded }}>
      {children}
    </ActionContext.Provider>
  );
};

const useActionContext = () => {
  return useContext(ActionContext);
};

export default useActionContext;

const styles = StyleSheet.create({});

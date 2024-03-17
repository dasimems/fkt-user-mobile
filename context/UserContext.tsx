import { StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from "react";
import { FormProviderTypes } from "@/utils/types";
import { userInitialValue, userReducer } from "@/reducers";
import {
  RESET_USER_CONTEXT,
  SET_USER_ASSETS,
  SET_USER_BALANCE,
  SET_USER_DETAILS,
  SET_USER_GENERATION_REFERRALS,
  SET_USER_LINEAR_REFERRALS,
  SET_USER_PROJECTS,
  SET_USER_TOKEN,
  SET_USER_TRANSACTIONS
} from "@/utils/_enums";
import {
  AssetExpectedDataType,
  InitialValueType,
  LinearReferralsExpectedDataType,
  ProjectExpectedDataType,
  TransactionExpectedDataType
} from "@/reducers/userReducer";
import { UserDetailsType, WalletResponseType } from "@/api/index.d";
import { setHeaderAuthorization } from "@/api";
import { saveUserToken } from "@/localServices/function";

interface UserContextFunctionTypes {
  setToken: (payload?: string) => void;
  resetUserContext: () => void;
  setUserDetails: (payload?: UserDetailsType) => void;
  setUserAssets: (payload?: AssetExpectedDataType) => void;
  setUserProjects: (payload?: ProjectExpectedDataType) => void;
  setUserTransactions: (payload?: TransactionExpectedDataType) => void;
  setUserBalance: (payload?: WalletResponseType) => void;
  setUserLinearReferrals: (payload?: LinearReferralsExpectedDataType) => void;
  setUserAssistReferral: (payload?: {
    [name: string]: LinearReferralsExpectedDataType;
  }) => void;
}

const UserContext = createContext<InitialValueType & UserContextFunctionTypes>({
  ...userInitialValue,
  setToken: () => {},
  resetUserContext: () => {},
  setUserDetails: () => {},
  setUserAssets: () => {},
  setUserProjects: () => {},
  setUserTransactions: () => {},
  setUserBalance: () => {},
  setUserLinearReferrals: () => {},
  setUserAssistReferral: () => {}
});

export const UserProvider: React.FC<FormProviderTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialValue);

  const setToken = useCallback((payload?: string) => {
    dispatch({
      type: SET_USER_TOKEN,
      payload: payload || null
    });
  }, []);
  const setUserDetails = useCallback((payload?: UserDetailsType) => {
    dispatch({
      type: SET_USER_DETAILS,
      payload: payload || null
    });
  }, []);

  const setUserAssets = useCallback((payload?: AssetExpectedDataType) => {
    dispatch({
      type: SET_USER_ASSETS,
      payload: payload || null
    });
  }, []);
  const setUserProjects = useCallback((payload?: ProjectExpectedDataType) => {
    dispatch({
      type: SET_USER_PROJECTS,
      payload: payload || null
    });
  }, []);
  const setUserTransactions = useCallback(
    (payload?: TransactionExpectedDataType) => {
      dispatch({
        type: SET_USER_TRANSACTIONS,
        payload: payload || null
      });
    },
    []
  );
  const setUserBalance = useCallback((payload?: WalletResponseType) => {
    dispatch({
      type: SET_USER_BALANCE,
      payload: payload || null
    });
  }, []);
  const setUserLinearReferrals = useCallback(
    (payload?: LinearReferralsExpectedDataType) => {
      dispatch({
        type: SET_USER_LINEAR_REFERRALS,
        payload: payload || null
      });
    },
    []
  );
  const setUserAssistReferral = useCallback(
    (payload?: { [name: string]: LinearReferralsExpectedDataType }) => {
      dispatch({
        type: SET_USER_GENERATION_REFERRALS,
        payload: payload || null
      });
    },
    []
  );

  const resetUserContext = useCallback(() => {
    dispatch({
      type: RESET_USER_CONTEXT
    });
  }, []);

  useEffect(() => {
    // console.log(state);
    if (state.token) {
      setHeaderAuthorization(state.token);
      saveUserToken(state.token);
    }
  }, [state.token]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        setToken,
        setUserDetails,
        resetUserContext,
        setUserAssets,
        setUserProjects,
        setUserTransactions,
        setUserBalance,
        setUserLinearReferrals,
        setUserAssistReferral
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;

const styles = StyleSheet.create({});

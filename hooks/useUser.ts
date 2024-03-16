import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useUserContext } from "@/context";
import {
  deleteUserToken,
  getUserToken,
  showToast
} from "@/localServices/function";
import { processRequest } from "@/api/functions";
import { getUserDetailsApi, logoutApi } from "@/api/url";
import { setHeaderAuthorization } from "@/api";

const useUser = () => {
  const { token, setToken, resetUserContext, setUserDetails } =
    useUserContext();

  const deleteUserRecord = () => {
    deleteUserToken()
      .then(() => {
        resetUserContext();
      })
      .catch(() => {
        showToast("Service error");
      });
  };

  const fetchUserDetails = useCallback(async () => {
    let savedToken = token;
    if (!token) {
      savedToken = await getUserToken();
      if (savedToken) {
        setToken(savedToken);
      }
    }

    if (savedToken) {
      setHeaderAuthorization(savedToken);
      processRequest(getUserDetailsApi)
        .then((res) => {
          const userDetails = res?.response;
          setUserDetails(userDetails);
        })
        .catch((err) => {
          const errMessage =
            err?.statusText || "Error encountered fetching user details";

          if (errMessage.toLowerCase() === "unauthorized") {
            deleteUserRecord();
          } else {
            showToast(errMessage);
          }
        });
    }
  }, [token]);

  const fetchUserAssets = useCallback(() => {}, []);

  const logoutUser = useCallback(() => {
    return processRequest(logoutApi);
  }, []);
  return { logoutUser, fetchUserDetails, deleteUserRecord };
};

export default useUser;

const styles = StyleSheet.create({});

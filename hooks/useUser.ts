import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useUserContext } from "@/context";
import {
  deleteUserToken,
  getUserToken,
  showToast
} from "@/localServices/function";
import { processRequest } from "@/api/functions";
import {
  getUserAssetsApi,
  getUserAssistReferrersApi,
  getUserAssistReferrersStatApi,
  getUserBalanceApi,
  getUserDetailsApi,
  getUserLinearReferrersApi,
  getUserProjectsApi,
  getUserTransactionsApi,
  logoutApi
} from "@/api/url";
import { setHeaderAuthorization } from "@/api";
import { generalError } from "@/utils/_variables";
import {
  AssetExpectedDataType,
  LinearReferralsExpectedDataType,
  ProjectExpectedDataType,
  TransactionExpectedDataType
} from "@/reducers/userReducer";
import useFireStoreDetails from "./useFireStoreDetails";

const useUser = () => {
  const {
    token,
    setToken,
    resetUserContext,
    setUserDetails,
    setUserBalance,
    setUserLinearReferrals,
    setUserAssets,
    setUserProjects,
    setUserTransactions,
    setUserAssistReferral,
    generationReferrals
  } = useUserContext();
  const { getUserFireStoreDetails } = useFireStoreDetails();

  const deleteUserRecord = async () => {
    await deleteUserToken()
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
          const userDetails = res?.response?.data;
          setUserDetails(userDetails);
          getUserFireStoreDetails();
        })
        .catch((err) => {
          const errMessage =
            err?.statusText || "Error encountered fetching user details";

          if (errMessage.toLowerCase() === "unauthenticated") {
            deleteUserRecord();
          } else {
            showToast(errMessage);
          }
        });
    }
  }, [token]);

  const fetchUserTransactions = useCallback(() => {
    if (token) {
      processRequest(getUserTransactionsApi)
        .then((res) => {
          const response = res?.response;
          const userTransactions: TransactionExpectedDataType = {
            data: response?.transactions || null,
            next: response?.links?.next || null,
            total: response?.meta?.total || 0
          };
          setUserTransactions(userTransactions);
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        });
    }
  }, [token]);
  const fetchUserAssets = useCallback(() => {
    if (token) {
      processRequest(getUserAssetsApi)
        .then((res) => {
          const response = res?.response;
          const userAssets: AssetExpectedDataType = {
            data: response?.assets || null,
            next: response?.links?.next || null,
            total: response?.meta?.total || 0
          };
          setUserAssets(userAssets);
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        });
    }
  }, [token]);
  const fetchUserProjects = useCallback(() => {
    if (token) {
      processRequest(getUserProjectsApi)
        .then((res) => {
          const response = res?.response;
          const userProjects: ProjectExpectedDataType = {
            data: response?.projects || null,
            next: response?.links?.next || null,
            total: response?.meta?.total || 0
          };
          setUserProjects(userProjects);
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        });
    }
  }, [token]);
  const fetchUserLinearReferrers = useCallback(() => {
    if (token) {
      processRequest(getUserLinearReferrersApi)
        .then((res) => {
          const response = res?.response;
          const linearReferrals: LinearReferralsExpectedDataType = {
            data: response?.users || null,
            next: response?.links?.next || null,
            total: response?.meta?.total || 0
          };
          setUserLinearReferrals(linearReferrals);
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        });
    }
  }, [token]);

  const fetchUserAssistReferrersStat = useCallback(() => {
    if (token) {
      processRequest(getUserAssistReferrersStatApi)
        .then((res) => {
          const stats = res?.response || {};
          const statsKey = Object.keys(stats);
          let userGenerationReferrer: {
            [name: string]: LinearReferralsExpectedDataType;
          } = {
            ...generationReferrals
          };

          statsKey.forEach((key) => {
            userGenerationReferrer = {
              ...userGenerationReferrer,
              [key]: { ...generationReferrals[key], total: stats[key] }
            };
          });
          setUserAssistReferral(userGenerationReferrer);
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        });
    }
  }, [token, generationReferrals]);
  const fetchUserAssistReferrers = useCallback(
    (gen: string) => {
      if (token && gen) {
        processRequest(getUserAssistReferrersApi(gen))
          .then((res) => {
            const referrals = res?.response?.users || {};
            let userGenerationReferrer: {
              [name: string]: LinearReferralsExpectedDataType;
            } = {
              ...generationReferrals,
              [gen]: { ...generationReferrals[gen], data: referrals }
            };

            setUserAssistReferral(userGenerationReferrer);
          })
          .catch((err) => {
            showToast(err?.statusText || generalError);
          });
      }
    },
    [token, generationReferrals]
  );

  const fetchBalance = useCallback(() => {
    if (token) {
      processRequest(getUserBalanceApi)
        .then((res) => {
          const userBalance = res?.response;
          setUserBalance(userBalance);
        })
        .catch((err) => {
          showToast(err?.statusText || generalError);
        });
    }
  }, [token]);

  const logoutUser = useCallback(() => {
    if (token) {
      return processRequest(logoutApi, {});
    }
  }, [token]);
  return {
    logoutUser,
    fetchUserDetails,
    deleteUserRecord,
    fetchUserAssets,
    fetchBalance,
    fetchUserProjects,
    fetchUserLinearReferrers,
    fetchUserTransactions,
    fetchUserAssistReferrersStat,
    fetchUserAssistReferrers
  };
};

export default useUser;

const styles = StyleSheet.create({});

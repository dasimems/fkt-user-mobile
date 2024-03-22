import { ApiURLType } from "./index.d";
import { requestType } from "./_variables";

export const apiVersion = "/v1",
  baseURL = `https://staging.foodsoldier.io/api${apiVersion}`,
  loginApi: ApiURLType = {
    method: requestType.post,
    url: "/login"
  },
  signupApi: ApiURLType = {
    method: requestType.post,
    url: "/register"
  },
  changePasswordApi: ApiURLType = {
    method: requestType.post,
    url: "/change_password"
  },
  logoutApi: ApiURLType = {
    method: requestType.post,
    url: "/logout"
  },
  getUserDetailsApi: ApiURLType = {
    method: requestType.get,
    url: "/account"
  },
  getUserBalanceApi: ApiURLType = {
    method: requestType.get,
    url: "/wallet"
  },
  getUserTransactionsApi: ApiURLType = {
    method: requestType.get,
    url: "/wallet/transactions"
  },
  getUserAssetsApi: ApiURLType = {
    method: requestType.get,
    url: "/assets"
  },
  getUserProjectsApi: ApiURLType = {
    method: requestType.get,
    url: "/projects"
  },
  getUserProjectsDetailsApi: (id: string) => ApiURLType = (id) => ({
    method: requestType.get,
    url: `/projects/${id}`
  }),
  getUserLinearReferrersApi: ApiURLType = {
    method: requestType.get,
    url: "/referrers/linear"
  },
  getUserAssistReferrersStatApi: ApiURLType = {
    method: requestType.get,
    url: "/referrers/stats"
  },
  getUserAssistReferrersApi: (gen: string) => ApiURLType = (gen) => ({
    method: requestType.get,
    url: `/referrers/${gen}`
  }),
  updateUserDetailsApi: ApiURLType = {
    method: requestType.post,
    url: "/account"
  },
  updateUserAvatarApi: ApiURLType = {
    method: requestType.post,
    url: "/account/avatar"
  },
  updatePasswordApi: ApiURLType = {
    method: requestType.post,
    url: "/change_password"
  },
  createDepositApi: ApiURLType = {
    method: requestType.post,
    url: "/wallet/deposit"
  },
  createWithdrawalApi: ApiURLType = {
    method: requestType.post,
    url: "/withdrawals"
  },
  createTransferApi: ApiURLType = {
    method: requestType.post,
    url: "/wallet/transfer"
  };

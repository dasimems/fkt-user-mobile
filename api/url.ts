import { ApiURLType, WasteDonationListStatus } from "./index.d";
import { requestType } from "./_variables";
import { /* BASE_URL, */ API_VERSION, BASE_URL2 } from "@env";

let BASE_URL = "https://app.foodsoldiers.io/api";

export const baseURL = `${BASE_URL}${API_VERSION}`,
  baseURL2 = BASE_URL2,
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
  verifyEmailApi: ApiURLType = {
    method: requestType.post,
    url: "/verify/email"
  },
  verifyPhoneApi: ApiURLType = {
    method: requestType.post,
    url: "/verify/phone"
  },
  sendPhoneOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/resend-phone-otp"
  },
  sendEmailOTPApi: ApiURLType = {
    method: requestType.post,
    url: "/resend-email-otp"
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
  },
  donateWasteApi: ApiURLType = {
    method: requestType.post,
    url: "/donate"
  },
  getWasteStatApi: (ext: string) => ApiURLType = (ext) => ({
    method: requestType.get,
    url: `/dashboard/${ext}`
  }),
  getDonationListApi: (status?: WasteDonationListStatus) => ApiURLType = (
    status
  ) => ({
    method: requestType.get,
    url: `/donations${status ? `/${status}` : ""}`
  });

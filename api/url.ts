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
  };

import { ColorSchemeType } from "@/utils/types";
import {
  deleteSecureData,
  getLocalStorageData,
  getSecureData,
  storeDataToLocalStorage,
  storeSecureData
} from ".";
import { serviceKeys } from "./variables";

export const saveUserToken = (token: string): Promise<void> => {
  return storeSecureData(serviceKeys.token, token);
};
export const getUserToken = (): Promise<string | null> => {
  return getSecureData(serviceKeys.token);
};
export const deleteUserToken = (): Promise<void> => {
  return deleteSecureData(serviceKeys.token);
};

export const saveColorScheme = (
  colorScheme: ColorSchemeType
): Promise<{ message: string; data: string }> => {
  return storeDataToLocalStorage(serviceKeys.colorScheme, colorScheme);
};

export const getColorScheme = (): Promise<string | null> | void => {
  return getLocalStorageData(serviceKeys.colorScheme);
};

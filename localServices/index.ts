import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { status } from "./variables";

export const storeSecureData = (
  key: string,
  data: string,
  options?: SecureStore.SecureStoreOptions
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (key && data) {
      SecureStore.setItemAsync(key, data, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `function storeSecureData Expected at least two parameters but got ${
          key || data ? 1 : "none"
        }`
      );
    }
  });
};

export const deleteSecureData = (
  key: string,
  options?: SecureStore.SecureStoreOptions
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (key) {
      SecureStore.deleteItemAsync(key, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `function deleteSecureData Expected at least one parameters but got none`
      );
    }
  });
};
export const getSecureData = (
  key: string,
  options?: SecureStore.SecureStoreOptions
): Promise<string | null> => {
  return new Promise<string | null>((resolve, reject) => {
    if (key) {
      SecureStore.getItemAsync(key, options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `function getSecureData Expected at least one parameters but got none`
      );
    }
  });
};

export const storeDataToLocalStorage = (
  key: string,
  data: string
): Promise<{
  message: string;
  data: string;
}> => {
  return new Promise<{
    message: string;
    data: string;
  }>(async (resolve, reject) => {
    if (key && data) {
      try {
        await AsyncStorage.setItem(key, data);
        resolve({
          message: "Data saved to localstorage",
          data
        });
      } catch (err) {
        reject(err);
      }
    } else {
      console.error(
        `function storeSecureData Expected at least two parameters but got ${
          key || data ? 1 : "none"
        }`
      );
    }
  });
};

export const deleteLocalStorageData = (key: string): Promise<void> | void => {
  if (key) {
    return AsyncStorage.removeItem(key);
  } else {
    console.error(
      `function deleteSecureData Expected at least one parameters but got none`
    );
  }
};

export const getLocalStorageData = (
  key: string
): Promise<string | null> | void => {
  if (key) {
    return AsyncStorage.getItem(key);
  } else {
    console.error(
      `function getSecureData Expected at least one parameters but got none`
    );
  }
};

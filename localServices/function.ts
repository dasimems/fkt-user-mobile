import { numberRegExp } from "@/utils/regex";
import { deleteSecureData, getSecureData, storeSecureData } from ".";
import { serviceKeys } from "./variables";
import { LayoutChangeEvent, Vibration } from "react-native";
import { VibrationTypes } from "@/utils/types";
import { vibrationLengths } from "@/utils/_variables";
import Toast, { ToastOptions } from "react-native-root-toast";

export const saveUserToken = (token: string): Promise<void> => {
  return storeSecureData(serviceKeys.token, token);
};
export const getUserToken = (): Promise<string | null> => {
  return getSecureData(serviceKeys.token);
};
export const deleteUserToken = (): Promise<void> => {
  return deleteSecureData(serviceKeys.token);
};

export const backspaceText: (
  text: string,
  backspaceLength?: number
) => string = (text, backspaceLength = 1) => {
  let newText = "";

  if (text.length <= backspaceLength) {
    newText = "";
  } else {
    newText = text.slice(0, text.length - backspaceLength);
  }
  return newText;
};

export const addText: (
  text: string,
  letter: string,
  maxLetter?: number
) => string = (text, letter, maxLetter) => {
  let newText = "";

  if (letter) {
    if (maxLetter && text.length < maxLetter) {
      newText = text + letter;
    } else {
      if (text) {
        newText = text;
      }
    }
  }

  return newText;
};

export const convertObjectToArray = <T extends Record<string, any>>(
  data: T
): Array<T[keyof T]> => {
  const objectData = Object.keys(data).map((key) => data[key]);
  return objectData;
};

export const Vibrate: (type: VibrationTypes) => void = (type = "short") => {
  Vibration.vibrate(vibrationLengths[type]);
};

export const getComponentLayoutProperties: (data: LayoutChangeEvent) => {
  x: number;
  y: number;
  width: number;
  height: number;
} = (data) => {
  var { x, y, width, height } = data.nativeEvent.layout;

  return { x, y, width, height };
};

export const regexTester = (regex: string | RegExp, text: string) => {
  return new RegExp(regex).test(text);
};

export const formatSeconds = (sec: number) => {
  var formatedSec = "0",
    secType = "s";

  if (sec) {
    var newSec: number = parseInt((sec / 1000) as unknown as string);

    if (newSec < 60) {
      formatedSec = `0.${newSec}`;
    } else {
      var secs: number = parseInt((newSec / 60) as unknown as string);
      var remainingSec: number = newSec - secs * 60;
      formatedSec = `${secs}.${remainingSec}`;
    }
  }
  return `${formatedSec}${secType}`;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  let newPhoneNumber = "";

  phoneNumber.split("").forEach((char) => {
    const isNumber = numberRegExp.test(char);

    if (isNumber) {
      newPhoneNumber += char;
    }
  });

  return newPhoneNumber;
};

export const showToast = (message: string, options?: ToastOptions): void => {
  Toast.show(message, {
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    ...options
  });
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const generateFileBlob = (
  uri: string,
  expectedMiMeType:
    | "text"
    | "application"
    | "image"
    | "audio"
    | "video" = "image"
) => {
  const name = uri.split("/").pop();
  const match = /\.(\w+)$/.exec(name as string);
  const type = match ? `${expectedMiMeType}/${match[1]}` : `image`;
  console.log(uri);
  return {
    uri,
    name,
    type
  } as unknown as Blob;
};

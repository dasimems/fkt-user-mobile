import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Share,
  Vibration
} from "react-native";
import { VibrationTypes } from "./types";
import { vibrationLengths } from "./_variables";
import { emailRegExp, numberRegExp } from "./regex";
import Toast, { ToastOptions } from "react-native-root-toast";
import * as WebBrowser from "expo-web-browser";

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

export const formatText = (text: string) => {
  const formatedText = text
    ? `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`
    : "";

  return formatedText;
};

export const stripText = (text: string, max: number = 15) => {
  const stripedText = text
    ? `${text.slice(0, max)}${text.length > max ? "..." : ""}`
    : "";

  return stripedText;
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
  return String(email).toLowerCase().match(emailRegExp);
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
  // console.log(uri);
  return {
    uri,
    name,
    type
  } as unknown as Blob;
};

export const validateValues: <T>(
  data: T | any,
  validation?: {
    [name: string]:
      | {
          required?: boolean;
          regex?: RegExp;
          minLength?: number;
          maxLength?: number;
          min?: number;
          max?: number;
        } & boolean;
  }
) => {
  errors: {
    [name: string]: string;
  };
} | null = (data, validation) => {
  let error: { [name: string]: string } | null = null;

  if (
    data &&
    typeof data === "object" &&
    validation &&
    typeof validation === "object"
  ) {
    const validationKeys = Object.keys(validation);

    validationKeys.forEach((key: string) => {
      const value = data[key];
      const validationValue = validation[key];

      if (validationValue) {
        if (typeof validationValue !== "object" && !value) {
          error = {
            ...error,
            [key]: `Please provide your ${key}`
          };
        } else {
          if (validationValue.required && !value) {
            error = {
              ...error,
              [key]: `Please provide your ${key}`
            };
          } else if (
            !isNaN(parseInt(value)) &&
            validationValue.min &&
            parseInt(value) < validationValue.min
          ) {
            error = {
              ...error,
              [key]: `Your ${key} must not be less than ${validation.min}`
            };
          } else if (
            !isNaN(parseInt(value)) &&
            validationValue.max &&
            parseInt(value) > validationValue.max
          ) {
            error = {
              ...error,
              [key]: `Your ${key} must not be greater than ${validation.max}`
            };
          } else if (
            validationValue.minLength &&
            value.length < validationValue.minLength
          ) {
            error = {
              ...error,
              [key]: `Your ${key} must not be less than ${validation.minLength} characters`
            };
          } else if (
            validationValue.maxLength &&
            value.length > validationValue.maxLength
          ) {
            error = {
              ...error,
              [key]: `Your ${key} must not be greater than ${validation.maxLength} characters`
            };
          } else if (
            validationValue.regex &&
            !validationValue.regex.test(value)
          ) {
            error = {
              ...error,
              [key]: `Please input a valid ${key}`
            };
          }
        }
      }
    });
  }

  return error;
};

export const shareContent = async (
  message: string,
  url?: string,
  title?: string
) => {
  if (message) {
    try {
      const result = await Share.share({
        message,
        url,
        title
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // showToast("Error encountered while sharing");
        }
      } else if (result.action === Share.dismissedAction) {
        showToast("Operation canceled by user");
      }
    } catch (error) {
      showToast("Error encountered while sharing");
    }
  } else {
    showToast("No Message passed");
  }
};
export const openLinkInBrowser = (link: string) => {
  WebBrowser.openBrowserAsync(link).catch((err) => {
    showToast("Error opening link");
  });
};

export const stripPhoneNumber = (number: string) => {
  let phoneNumber = "";

  if (
    number.toString().slice(0, 1) === "0" ||
    number.toString().slice(0, 1) === "+"
  ) {
    phoneNumber = number.slice(1);
  }

  return phoneNumber;
};

export const isCloseToBottom = (
  event: NativeSyntheticEvent<NativeScrollEvent>
) => {
  const { layoutMeasurement, contentOffset, contentSize } =
    event.nativeEvent || {};
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
};

export const ifCloseToTop = (
  event: NativeSyntheticEvent<NativeScrollEvent>
) => {
  const { layoutMeasurement, contentOffset, contentSize } =
    event.nativeEvent || {};
  return contentOffset.y == 0;
};

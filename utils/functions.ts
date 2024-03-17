import { LayoutChangeEvent, Vibration } from "react-native";
import { VibrationTypes } from "./types";
import { vibrationLengths } from "./_variables";

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

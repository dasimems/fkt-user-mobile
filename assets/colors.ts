import { ColorType } from "@/utils/types";

interface ColorVariance {
  dark: ColorType;
  light: ColorType;
}
export const whiteColor: ColorType = {
  default: "rgba(255, 255, 255,1)",
  opacity10: "rgba(255, 255, 255,.01)",
  opacity20: "rgba(255, 255, 255,.02)",
  opacity30: "rgba(255, 255, 255,.03)",
  opacity40: "rgba(255, 255, 255,.04)",
  opacity50: "rgba(255, 255, 255,.05)",
  opacity60: "rgba(255, 255, 255,.06)",
  opacity70: "rgba(255, 255, 255,.07)",
  opacity80: "rgba(255, 255, 255,.08)",
  opacity90: "rgba(255, 255, 255,.09)",
  opacity100: "rgba(255, 255, 255,.1)",
  opacity200: "rgba(255, 255, 255,.2)",
  opacity300: "rgba(255, 255, 255,.3)",
  opacity400: "rgba(255, 255, 255,.4)",
  opacity500: "rgba(255, 255, 255,.5)",
  opacity600: "rgba(255, 255, 255,.6)",
  opacity700: "rgba(255, 255, 255,.7)",
  opacity800: "rgba(255, 255, 255,.8)",
  opacity900: "rgba(255, 255, 255,.9)"
};
export const blackColor: ColorType = {
  default: "rgba(0,0,0,1)",
  opacity10: "rgba(0,0,0,.01)",
  opacity20: "rgba(0,0,0,.02)",
  opacity30: "rgba(0,0,0,.03)",
  opacity40: "rgba(0,0,0,.04)",
  opacity50: "rgba(0,0,0,.05)",
  opacity60: "rgba(0,0,0,.06)",
  opacity70: "rgba(0,0,0,.07)",
  opacity80: "rgba(0,0,0,.08)",
  opacity90: "rgba(0,0,0,.09)",
  opacity100: "rgba(0,0,0,.1)",
  opacity200: "rgba(0,0,0,.2)",
  opacity300: "rgba(0,0,0,.3)",
  opacity400: "rgba(0,0,0,.4)",
  opacity500: "rgba(0,0,0,.5)",
  opacity600: "rgba(0,0,0,.6)",
  opacity700: "rgba(0,0,0,.7)",
  opacity800: "rgba(0,0,0,.8)",
  opacity900: "rgba(0,0,0,.9)"
};
export const redColor: ColorType = {
  default: "rgba(255,0,0,1)",
  opacity10: "rgba(255,0,0,.01)",
  opacity20: "rgba(255,0,0,.02)",
  opacity30: "rgba(255,0,0,.03)",
  opacity40: "rgba(255,0,0,.04)",
  opacity50: "rgba(255,0,0,.05)",
  opacity60: "rgba(255,0,0,.06)",
  opacity70: "rgba(255,0,0,.07)",
  opacity80: "rgba(255,0,0,.08)",
  opacity90: "rgba(255,0,0,.09)",
  opacity100: "rgba(255,0,0,.1)",
  opacity200: "rgba(255,0,0,.2)",
  opacity300: "rgba(255,0,0,.3)",
  opacity400: "rgba(255,0,0,.4)",
  opacity500: "rgba(255,0,0,.5)",
  opacity600: "rgba(255,0,0,.6)",
  opacity700: "rgba(255,0,0,.7)",
  opacity800: "rgba(255,0,0,.8)",
  opacity900: "rgba(255,0,0,.9)"
};
export const primaryColor: ColorType = {
  default: "rgba(3,73,11, 1)",
  opacity10: "rgba(3,73,11, .01)",
  opacity20: "rgba(3,73,11, .02)",
  opacity30: "rgba(3,73,11, .03)",
  opacity40: "rgba(3,73,11, .04)",
  opacity50: "rgba(3,73,11, .05)",
  opacity60: "rgba(3,73,11, .06)",
  opacity70: "rgba(3,73,11, .07)",
  opacity80: "rgba(3,73,11, .08)",
  opacity90: "rgba(3,73,11, .09)",
  opacity100: "rgba(3,73,11, .1)",
  opacity200: "rgba(3,73,11, .2)",
  opacity300: "rgba(3,73,11, .3)",
  opacity400: "rgba(3,73,11, .4)",
  opacity500: "rgba(3,73,11, .5)",
  opacity600: "rgba(3,73,11, .6)",
  opacity700: "rgba(3,73,11, .7)",
  opacity800: "rgba(3,73,11, .8)",
  opacity900: "rgba(3,73,11, .9)"
};
export const backgroundColor: ColorType = {
  default: "rgba(226,232,240, 1)",
  opacity10: "rgba(226,232,240, .01)",
  opacity20: "rgba(226,232,240, .02)",
  opacity30: "rgba(226,232,240, .03)",
  opacity40: "rgba(226,232,240, .04)",
  opacity50: "rgba(226,232,240, .05)",
  opacity60: "rgba(226,232,240, .06)",
  opacity70: "rgba(226,232,240, .07)",
  opacity80: "rgba(226,232,240, .08)",
  opacity90: "rgba(226,232,240, .09)",
  opacity100: "rgba(226,232,240, .1)",
  opacity200: "rgba(226,232,240, .2)",
  opacity300: "rgba(226,232,240, .3)",
  opacity400: "rgba(226,232,240, .4)",
  opacity500: "rgba(226,232,240, .5)",
  opacity600: "rgba(226,232,240, .6)",
  opacity700: "rgba(226,232,240, .7)",
  opacity800: "rgba(226,232,240, .8)",
  opacity900: "rgba(226,232,240, .9)"
};

export const bgColor: ColorVariance = {
  dark: blackColor,
  light: whiteColor
};

export const textColor: ColorVariance = {
  dark: whiteColor,
  light: blackColor
};

export const buttonColor: ColorVariance = {
  dark: primaryColor,
  light: primaryColor
};

import { Dimensions } from "react-native";
import { ImageDimensionType, ScreenNamesType } from "./types";
import { blackColor, whiteColor } from "@/assets/colors";
import { Component, Folder, Home, User, Wallet } from "lucide-react-native";
import { convertObjectToArray } from "./functions";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const padding = 20,
  nav = "nav",
  vibrationLengths = {
    short: 1000,
    medium: 3000,
    long: 5000
  },
  iconSize = 16,
  defaultIconProps = {
    size: iconSize,
    color: blackColor.default
  },
  buttonTypes = {
    primary: "primary",
    secondary: "secondary",
    default: "default",
    transparent: "transparent"
  },
  colorSchemes = {
    dark: "dark",
    light: "light"
  },
  imageDimensions: { round: ImageDimensionType; square: ImageDimensionType } = {
    round: "round",
    square: "square"
  },
  ScreenNames: {
    [name: string]: ScreenNamesType;
  } = {
    GettingStarted: {
      name: "GetStarted",
      Icon: undefined,
      label: "Getting Started",
      activeNames: ["GettingStarted"],
      showIn: []
    },
    Login: {
      name: "Login",
      Icon: undefined,
      label: "Login",
      activeNames: ["Login"],
      showIn: []
    },
    Register: {
      name: "Register",
      Icon: undefined,
      label: "Register",
      activeNames: ["Register"],
      showIn: []
    },
    Dashboard: {
      name: "Dashboard",
      Icon: Home,
      label: "Dashboard",
      activeNames: ["Dashboard"],
      showIn: [nav]
    },
    Projects: {
      name: "Projects",
      Icon: Folder,
      label: "Projects",
      activeNames: ["Projects"],
      showIn: [nav]
    },
    Assets: {
      name: "Assets",
      Icon: Component,
      label: "Assets",
      activeNames: ["Assets"],
      showIn: [nav]
    },
    Wallet: {
      name: "Wallet",
      Icon: Wallet,
      label: "Wallet",
      activeNames: ["Wallet"],
      showIn: [nav]
    },
    Profile: {
      name: "Profile",
      Icon: User,
      label: "Profile",
      activeNames: ["Profile"],
      showIn: [nav]
    }
  },
  allScreenNames = convertObjectToArray(ScreenNames),
  navRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(nav)
  );

export { windowHeight, windowWidth, screenWidth, screenHeight };

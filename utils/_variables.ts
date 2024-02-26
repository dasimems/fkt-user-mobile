import { Dimensions } from "react-native";
import { ImageDimensionType, ScreenNamesType } from "./types";
import { blackColor, whiteColor } from "@/assets/colors";
import {
  Component,
  Folder,
  Home,
  Key,
  Landmark,
  User,
  Users,
  Wallet
} from "lucide-react-native";
import { convertObjectToArray } from "./functions";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const padding = 20,
  nav = "nav",
  profile = "profile",
  referral = "referral",
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
    Referrals: {
      name: "Referrals",
      Icon: Users,
      label: "Referrals",
      activeNames: ["Referrals"],
      showIn: [nav, profile]
    },

    Profile: {
      name: "Profile",
      Icon: User,
      label: "Profile",
      activeNames: ["Profile"],
      showIn: []
    },
    ProfileDetails: {
      name: "ProfileDetails",
      Icon: User,
      label: "Profile Details",
      activeNames: ["ProfileDetails"],
      showIn: [profile]
    },
    BankDetails: {
      name: "BankDetails",
      Icon: Landmark,
      label: "Bank Details",
      activeNames: ["BankDetails"],
      showIn: [profile]
    },
    ChangePassword: {
      name: "ChangePassword",
      Icon: Key,
      label: "Change Password",
      activeNames: ["ChangePassword"],
      showIn: [profile]
    },
    TransactionDetails: {
      name: "TransactionDetails",
      Icon: undefined,
      label: "Transaction Details",
      activeNames: ["TransactionDetails"],
      showIn: []
    },
    LinearReferrals: {
      name: "LinearReferrals",
      Icon: undefined,
      label: "Linear",
      activeNames: ["LinearReferral"],
      showIn: [referral]
    },
    AssistReferrals: {
      name: "AssistReferrals",
      Icon: undefined,
      label: "Assist",
      activeNames: ["AssistReferral"],
      showIn: [referral]
    },
    Chats: {
      name: "Chats",
      Icon: undefined,
      label: "Chats",
      activeNames: ["Chats"],
      showIn: []
    },
    ChatDetails: {
      name: "ChatDetails",
      Icon: undefined,
      label: "Chat Details",
      activeNames: ["ChatDetails"],
      showIn: []
    },
    ProjectDetails: {
      name: "ProjectDetails",
      Icon: undefined,
      label: "Project Details",
      activeNames: ["ProjectDetails"],
      showIn: []
    },
    AssetDetails: {
      name: "AssetDetails",
      Icon: undefined,
      label: "Asset Details",
      activeNames: ["AssetDetails"],
      showIn: []
    },
    Deposit: {
      name: "Deposit",
      Icon: undefined,
      label: "Deposit",
      activeNames: ["Deposit"],
      showIn: []
    },
    Withdraw: {
      name: "Withdraw",
      Icon: undefined,
      label: "Withdraw",
      activeNames: ["Withdraw"],
      showIn: []
    },
    Transfer: {
      name: "Transfer",
      Icon: undefined,
      label: "Transfer",
      activeNames: ["Transfer"],
      showIn: []
    },
    TransferConfirmation: {
      name: "TransferConfirmation",
      Icon: undefined,
      label: "TransferConfirmation",
      activeNames: ["TransferConfirmation"],
      showIn: []
    },
    DepositConfirmation: {
      name: "DepositConfirmation",
      Icon: undefined,
      label: "DepositConfirmation",
      activeNames: ["DepositConfirmation"],
      showIn: []
    },
    WithdrawConfirmation: {
      name: "WithdrawConfirmation",
      Icon: undefined,
      label: "WithdrawConfirmation",
      activeNames: ["WithdrawConfirmation"],
      showIn: []
    }
  },
  ReferralGenerations = {
    First: {
      value: "first-generation",
      label: "First generation"
    },
    Second: {
      value: "second-generation",
      label: "Second generation"
    },
    Third: {
      value: "third-generation",
      label: "Third generation"
    },
    Fourth: {
      value: "fourth-generation",
      label: "Fourth generation"
    },
    Fifth: {
      value: "fifth-generation",
      label: "Fifth generation"
    }
  },
  allGenerations = convertObjectToArray(ReferralGenerations),
  allScreenNames = convertObjectToArray(ScreenNames),
  navRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(nav)
  ),
  profileRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(profile)
  ),
  referralRoutes = allScreenNames.filter((screenName) =>
    screenName.showIn.includes(referral)
  );

export { windowHeight, windowWidth, screenWidth, screenHeight };

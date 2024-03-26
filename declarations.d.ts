declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const Content: React.FC<SvgProps>;
  export default Content;
}

declare module "@env" {
  export const PROCESS: string;
  export const BASE_URL: string;
  export const API_VERSION: string;
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  export const FIREBASE_DATABASE_URL: string;
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_STORAGE_BUCKET: string;
  export const FIREBASE_MESSAGING_ID: string;
  export const FIREBASE_APP_ID: string;
  export const FIREBASE_MEASUREMENT_ID: string;
}

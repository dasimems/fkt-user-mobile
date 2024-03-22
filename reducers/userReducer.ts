import {
  AssetType,
  ProjectType,
  ReferralType,
  TransactionType,
  UserDetailsType,
  WalletResponseType
} from "@/api/index.d";
import {
  RESET_USER_CONTEXT,
  SET_USER_ASSETS,
  SET_USER_BALANCE,
  SET_USER_DETAILS,
  SET_USER_FIRESTORE_DETAILS_TYPE,
  SET_USER_GENERATION_REFERRALS,
  SET_USER_LINEAR_REFERRALS,
  SET_USER_PROJECTS,
  SET_USER_SETTINGS,
  SET_USER_TOKEN,
  SET_USER_TRANSACTIONS,
  UserType
} from "@/utils/_enums";

const emptyData = {
  data: null,
  next: null,
  total: 0
};

interface DataTypeValues {
  next?: string | null;
  total?: number;
}

export interface AssetExpectedDataType extends DataTypeValues {
  data: AssetType[] | null;
}
export interface ProjectExpectedDataType extends DataTypeValues {
  data: ProjectType[] | null;
}
export interface LinearReferralsExpectedDataType extends DataTypeValues {
  data: ReferralType[] | null;
}
export interface TransactionExpectedDataType extends DataTypeValues {
  data: TransactionType[] | null;
}

export interface FireStoreDetailsType {
  avatar: string;
  email: string;
  id: string;
  name: string;
  phoneNumber: string;
}

export interface UserSettingsType {
  [name: string]: any;
}

export interface InitialValueType {
  userDetails: UserDetailsType | null;
  token: string | null;
  assets: AssetExpectedDataType;
  projects: ProjectExpectedDataType;
  linearReferrals: LinearReferralsExpectedDataType;
  generationReferrals: {
    [name: string]: LinearReferralsExpectedDataType;
  };
  balance: WalletResponseType | null;
  transactions: TransactionExpectedDataType;
  fireStoreDetails: FireStoreDetailsType | null;
  userSettings: UserSettingsType | null;
}

export const initialValue: InitialValueType = {
  userDetails: null,
  token: null,
  assets: emptyData,
  projects: emptyData,
  linearReferrals: emptyData,
  generationReferrals: {},
  balance: null,
  transactions: emptyData,
  fireStoreDetails: null,
  userSettings: null
};

export const reducer = (
  state: InitialValueType,
  action: { type: UserType; payload?: any }
): InitialValueType => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    case SET_USER_TOKEN:
      return { ...state, token: payload };
    case SET_USER_ASSETS:
      return { ...state, assets: { ...payload } };
    case SET_USER_TRANSACTIONS:
      return { ...state, transactions: { ...payload } };
    case SET_USER_PROJECTS:
      return { ...state, projects: { ...payload } };
    case SET_USER_LINEAR_REFERRALS:
      return { ...state, linearReferrals: { ...payload } };
    case SET_USER_GENERATION_REFERRALS:
      return { ...state, generationReferrals: { ...payload } };
    case SET_USER_BALANCE:
      return { ...state, balance: payload };
    case SET_USER_FIRESTORE_DETAILS_TYPE:
      return { ...state, fireStoreDetails: payload };
    case SET_USER_SETTINGS:
      return { ...state, userSettings: payload };
    case RESET_USER_CONTEXT:
      return initialValue;
    default:
      return state;
  }
};

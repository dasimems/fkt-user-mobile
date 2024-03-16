import { AxiosError, AxiosResponse } from "axios";
import Login from "../screens/login/Login";

export interface AuthenticationType {
  type: string;
  token: string;
}

export interface BankDetailsType {
  name: string;
  number: string;
  bank: string;
}

export interface ReferralType {
  id: string;
  type: string;
  name: string;
  avatar: string;
  email: string;
  link: string;
  token: string;
}

export interface TransactionType {
  id: string;
  type: "credit" | "debit";
  title: string;
  amount: CurrencyFormattingType;
  action: string;
  created_at: Date;
}

export interface WithdrawalType {
  id: string;
  owner_type: string;
  owner_id: string;
  transaction_id: null;
  amount: CurrencyFormattingType;
  note: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface CurrencyFormattingType {
  amount: string;
  display: string;
  symbol: string;
  currency: string;
}
export interface ResponseLinkType {
  first: string;
  last: string;
  prev: null | string;
  next: null | string;
}

export interface MetaLinkType {
  url: null | string;
  label: string;
  active: boolean;
}
export interface ResponseMetaType {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinkType[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ProjectTimelineType {
  date: Date;
  done: boolean;
  title: string;
  overview: string;
}

export interface UserDetailsType {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  account: BankDetailsType;
  email_verified: boolean;
  phone_verified: boolean;
  link: string;
  is_issuer: number;
  created_at: Date;
}

export interface ProjectType {
  id: string;
  name: string;
  image: string;
  images: string[];
  overview: string;
  description: string;
  proposal: string;
  rate: number;
  total: number;
  sold: number;
  min_sale: number;
  revenue: CurrencyFormattingType;
  sale_ends_at: Date;
  starts_at: Date;
  ends_at: Date;
  timeline: ProjectTimelineType[];
  status: "active" | "seized";
}

export interface AssetType {
  id: string;
  amount: CurrencyFormattingType;
  value: number;
  rate: number;
  purchased_at: Date;
  price_before: number;
  status: "active" | "seized";
  created_at: Date;
  project: ProjectType & {
    issuer: {
      id: string;
      name: string;
      email: string;
      avatar: string;
      phone: string;
      resume: string;
      user: UserDetailsType;
      account: BankDetailsType;
      created_at: Date;
    };
  };
}
export interface LoginBodyType {
  email: string;
  password: string;
}

export interface RegisterBodyType {
  name: string;
  username: string;
  email: string;
  phone: string;
  referrer_code: string;
  community: string;
  assist_id: string;
  date_of_birth: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponseType {
  message: string;
  authentication: AuthenticationType & {
    user: UserDetailsType;
  };
}
export interface SignUpResponseType extends LoginResponseType {}

export interface WalletResponseType {
  wallet: {
    balance: CurrencyFormattingType;
  };
  credits: CurrencyFormattingType;
  debits: CurrencyFormattingType;
  withdrawal: WithdrawalType;
}

export interface AssetsResponseType {
  assets: AssetType[];
  links: ResponseLinkType;
  meta: ResponseMetaType;
}
export interface ProjectsResponseType {
  assets: ProjectType[];
  links: ResponseLinkType;
  meta: ResponseMetaType;
}
export interface TransactionsResponseType {
  transactions: TransactionType[];
  links: ResponseLinkType;
  meta: ResponseMetaType;
}
export interface TransactionResponseType {
  data: TransactionType;
}
export interface AssetResponseType {
  data: AssetType;
}
export interface ProjectResponseType {
  data: ProjectType;
}

export interface ReferralsResponseType {
  users: ReferralType[];
  links: ResponseLinkType;
  meta: ResponseMetaType;
}
export interface ReferralsResponseType {
  users: ReferralType[];
  links: ResponseLinkType;
  meta: ResponseMetaType;
}
export interface GenerationReferralStatResponseType {
  [name: string]: number;
}
export interface ErrorResponseType {
  message?: string;
  timeStamp?: Date;
  status?: string;
}

export interface ApiErrorType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: {
    message: string;
    errors: {
      [name: string]: string[];
    };
  };
}

export type AllResponseType = LoginResponseType &
  SignUpResponseType &
  UserDetailsType &
  WalletResponseType &
  AssetsResponseType &
  ProjectResponseType &
  TransactionResponseType &
  TransactionsResponseType &
  AssetResponseType &
  ReferralsResponseType &
  GenerationReferralStatResponseType;

export type AllRequestType = "post" | "get" | "delete" | "put";

export type ResponseStatus = "error" | "success";

export interface ApiURLType {
  method: AllRequestType;
  url: string;
  returnToken?: boolean;
}

export interface ResponseType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: AllResponseType;
}
export interface ApiErrorResponseType {
  type: ResponseStatus;
  code: string | number;
  statusText: string;
  response: AllResponseType;
}

export type ApiRequestResponseType = Promise<ResponseType>;

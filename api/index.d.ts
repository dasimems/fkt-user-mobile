import { AxiosError, AxiosResponse } from "axios";
import Login from "../screens/login/Login";

export type WasteDonationListStatus = "active" | "completed" | "pending";
export type UserWasteRole = "donor" | "waste-aggregator" | "waste-master";
export interface CurrencyFormattingType {
  amount: string;
  display: string;
  symbol: string;
  currency: string;
}
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
  role: UserWasteRole;
  status: string;
  is_issuer: boolean;
  created_at: number;
  userPaidStatus: number;
  pending_waste_points: number;
  valid_waste_points: number;
  total_donations: number;
  total_donations_picked: number;
  total_waste_weight_donated: number;
  weightiest_waste_donate: number;
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

export interface IssuerType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  resume: string;
  user: UserDetailsType;
  account: BankDetailsType;
  created_at: Date;
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
    issuer: IssuerType;
  };
}
export interface LoginBodyType {
  email: string;
  password: string;
}
export interface LoginResponseType {
  message: string;
  authentication: AuthenticationType & {
    user: UserDetailsType;
  };
}
export interface SignUpResponseType extends LoginResponseType {}

export interface SignupBodyType {
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
export interface UpdateProfileBodyType {
  name: string;
  email: string;
  phone: string;
}
export interface UpdateBankDetailsBodyType {
  account_name: string;
  account_number: string;
  account_bank: string;
}
export interface UpdatePasswordBodyType {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface DepositBodyType {
  amount: string;
}
export interface WithdrawalBodyType {
  amount: string;
  note: string;
}
export interface TransferBodyType {
  amount: string;
  remarks: string;
  email: string;
  password: string;
}

export interface FetchUserDetailsResponseType {
  data: UserDetailsType;
}

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
  projects: ProjectType[];
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

export interface PostContentType {
  userId: string;
  id: string;
  postId: string;
  createdAt: Date | number;
}

export interface PostCommentType extends PostContentType {
  comment: string;
  failed?: boolean;
  isSending?: boolean;
}

export interface CommunityPostType {
  title: string;
  post: string;
  createdAt: Date | number;
  userId: string;
  likes: PostContentType[];
  comments: PostCommentType[];
  id: string;
  views: PostContentType[];
}

export interface DonationType {
  _id: string;
  aggregator: {
    id: string;
    name: string;
    phone_number: string;
  };
  aggregators: string[];
  category: string;
  datetime_created: Date;
  donor_id: string;
  donor_name: string;
  phone_number: string;
  pickup_location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  scheduled_pickup_time: string;
  status: string;
  user_role: string;
  weight: string;
}
export interface WasteStatType {
  active_donations: number;
  completed_donations: number;
  pending_confirmations: number;
  pickup_requests: number;
}

export interface WasteStateResponseType {
  message: string;
  response: WasteStatType;
  status: "success" | "failed";
}
export interface DonationListResponseType {
  message: string;
  response: {
    length: number;
    request_details: DonationType[];
  };
  status: "success" | "failed";
}

export interface FetchedCommunityPostType extends CommunityPostType {
  userPersonalName: string;
  avatar: string;
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
  FetchUserDetailsResponseType &
  WalletResponseType &
  AssetsResponseType &
  ProjectResponseType &
  ProjectsResponseType &
  TransactionResponseType &
  TransactionsResponseType &
  AssetResponseType &
  ReferralsResponseType &
  GenerationReferralStatResponseType &
  WasteStateResponseType &
  DonationListResponseType;

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

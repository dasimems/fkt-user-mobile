import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseURL, baseURL2 } from "./url";
import {
  ApiRequestResponseType,
  ErrorResponseType,
  ResponseType
} from "./index.d";
import { status } from "./_variables";

const controller = new AbortController();

const api = axios.create({
  baseURL: baseURL2,
  signal: controller.signal
});

export const setHeaderAuthorization2: (token: string) => void = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
  postData2: <T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, config) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .post(url, data, config)
        .then((res) => {
          // console.log(res);
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: res?.data || null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          // console.log(err)

          // console.log(err)
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  getData2: (
    url: string,
    config?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, config) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .get(url, config)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: res?.data || null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          // console.log(err)
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  putData2: <T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, config) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .put(url, data, config)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: res?.data || null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          // console.log(err)
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  deleteData2: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, config) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .delete(url, config)
        .then((res) => {
          resolve({
            type: status.success,
            code: res?.status,
            statusText: res?.statusText,
            response: res?.data || null
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          // console.log(err)
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  abortOutgoingRequest2 = () => {
    controller.abort();
  };

export default api;

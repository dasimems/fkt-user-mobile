import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseURL } from "./url";
import {
  ApiRequestResponseType,
  ErrorResponseType,
  ResponseType
} from "./index.d";
import { status } from "./_variables";

const controller = new AbortController();

const api = axios.create({
  baseURL,
  signal: controller.signal
});

export const setHeaderAuthorization: (token: string) => void = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
  postData: <T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, config) => {
    return new Promise<ResponseType>((resolve, reject) => {
      console.log(baseURL, url);
      if (data) {
        api
          .post(url, data, config)
          .then((res) => {
            console.log(res);
            resolve({
              type: status.success,
              code: res?.status,
              statusText: res?.statusText,
              response: res?.data || null
            });
          })
          .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
            console.log(err);
            reject({
              type: status.error,
              code: err?.response?.status || err?.code,
              statusText: err?.response?.data?.message || err?.message,
              response: err?.response?.data || null
            });
          });
      } else {
        reject({
          type: status.error,
          code: undefined,
          statusText: "No data sent",
          response: null
        });
      }
    });
  },
  getData: (
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
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  putData: <T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, config) => {
    return new Promise<ResponseType>((resolve, reject) => {
      if (data) {
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
            reject({
              type: status.error,
              code: err?.response?.status || err?.code,
              statusText: err?.response?.data?.message || err?.message,
              response: err?.response?.data || null
            });
          });
      } else {
        reject({
          type: status.error,
          code: undefined,
          statusText: "No data sent",
          response: null
        });
      }
    });
  },
  deleteData: <T>(
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
          reject({
            type: status.error,
            code: err?.response?.status || err?.code,
            statusText: err?.response?.data?.message || err?.message,
            response: err?.response?.data || null
          });
        });
    });
  },
  abortOutgoingRequest = () => {
    controller.abort();
  };

export default api;

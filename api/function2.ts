import { AxiosRequestConfig } from "axios";
import { requestType } from "./_variables";
import { ApiRequestResponseType, ApiURLType, ResponseType } from "./index.d";
import { deleteData2, getData2, postData2, putData2 } from "./index2";

export const processRequest2: <T>(
  api: ApiURLType,
  data?: T,
  config?: AxiosRequestConfig
) => ApiRequestResponseType = (api, data, config) => {
  return new Promise<ResponseType>((resolve, reject) => {
    if (api.method === requestType.post) {
      postData2(api.url, data, config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (api.method === requestType.put) {
      putData2(api.url, data, config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (api.method === requestType.get) {
      getData2(api.url, config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (api.method === requestType.delete) {
      deleteData2(api.url, config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.error(
        `api method not recognized. method must be a value of ${requestType.delete} | ${requestType.post} |  ${requestType.put} | ${requestType.get}`
      );
    }
  });
};

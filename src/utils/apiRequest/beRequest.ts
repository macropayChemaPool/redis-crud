import type { Method, ResponseType, AxiosResponse } from "axios";
import axios from "axios";
// import type { IResponseAPI } from "src/interfaces/common";
import { v4 as uuidv4 } from "uuid";

export interface IResponseAPI<TRes> {
  statusCode: string;
  code: number;
  status: string;
  message: string;
  data: TRes;
}

const headersDefault = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

axios.interceptors.response.use(
  function (response) {
    // eslint-disable-next-line no-console
    console.log(
      `\x1b[32m<URL>\x1b[37m: ${
        response.config.url
      }\n \x1b[32m<HEADERS>\x1b[37m: ${JSON.stringify(
        response.config.headers
      )}\n \x1b[32m<BODY>\x1b[37m: ${JSON.stringify(
        response.config.data
      )}\n \x1b[32m<RESPONSE>\x1b[37m: ${JSON.stringify(response.data)}`
    );
    return response;
  },
  function (error) {
    // eslint-disable-next-line no-console
    console.log(error?.response);
    return Promise.reject(error);
  }
);

export const beRequest = <TRes, TData = {}>(
  path: string,
  method: Method,
  data?: TData,
  headers?: Record<string, unknown>,
  responseType: ResponseType = "json"
) => {
  const url = path;
  const params = method === "GET" ? data : undefined;
  return axios.request<
    IResponseAPI<TRes>,
    AxiosResponse<TRes, TData>,
    TData
  >({
    method,
    url,
    params,
    data,
    headers: { ...headersDefault, ...headers, "tag-id": uuidv4() },
    responseType,
  });
};

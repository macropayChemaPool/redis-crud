import axios, { Method, ResponseType, AxiosResponse } from "axios";
// import { paramsToSend } from "src/interfaces/common";
// import { BASE_PATH } from "@constants/enviroments";

const isDebug = process.env.LOGS_LEVEL === "debug";

const log = (message: string): void => {
  if (isDebug) console.log(message);
};

const headersDefault = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export const feRequest = <TRes, TData = any>(
  path: string,
  method: Method,
  data?: TData,
  responseType: ResponseType = "json",
  headers?: {}
) => {
  const urlParams = new URLSearchParams(window.location.search);
  const flow = urlParams.get("flow");
  log(`flow: ${flow}`);
  const params = method === "GET" ? data : undefined;
  return axios.request<TRes, AxiosResponse<TRes, TData>, TData>({
    method,
    url: `/api${path}`,
    params,
    data,
    headers: {
      ...headersDefault,
      ...headers,
      flow,
    },
    responseType,
  });
};

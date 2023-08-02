import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuth } from "../Context/Auth/AuthContextPovider";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export const get = (url: string, token?: string) =>
  axiosInstance
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(responseBody);

export const post = (
  url: string,
  body: {},
  withCredentials = false,
  token?: string
) =>
  axiosInstance
    .post(url, body, {
      withCredentials: withCredentials,
      headers: {
        Authorization: token? `Bearer ${token}` : null,
        "Content-Type": "application/json",
      },
    })
    .then(responseBody);

export const put = (url: string, body: {}) =>
  axiosInstance.put(url, body).then(responseBody);

export const _delete = (url: string, token?: string) =>
  axiosInstance
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(responseBody);

export default axiosInstance;

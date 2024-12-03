import axios from "axios";
import { getToken } from ".";
import { toast } from "react-toastify";

export const baseAPI = axios.create({
  baseURL: "https://basicauth.webluna.org",
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequest = (request) => {
  if (request.delayRequest) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = getToken();
        if (user) {
          request.headers["x-auth-token"] = user.token;
          request.headers.Accept = "application/json";
          request.headers["Content-Type"] = "application/json";
        }
        resolve(request);
      }, 1000);
    });
  } else {
    const user = getToken();
    if (user) {
      request.headers["x-auth-token"] = user.token;
      request.headers.Accept = "application/json";
      request.headers["Content-Type"] = "application/json";
    }
    return Promise.resolve(request);
  }
};

const onErrorRequest = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => Promise.resolve(response);

const onErrorResponse = (error) => {
  if (
    (error.response && error.response.status === 401) ||
    error.response.status === 403
  ) {
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

baseAPI.interceptors.request.use(onRequest, onErrorRequest);
baseAPI.interceptors.response.use(onResponse, onErrorResponse);

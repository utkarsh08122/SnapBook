"use client";
import {
  KEY_ACCESS_TOKEN,
  getItems,
  removeItem,
  setItem,
} from "@/helper/localStroageManager";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((request: any) => {
  const accessToken = localStorage.getItem("accessToken");
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (respons: any) => {
  const data = respons.data;

  if (data.status === "ok") {
    return respons;
  }
  const origanalRequest = respons.config;

  const statuscode = data.statusCode;
  const result = data.result;

  // when refress token is expire
  if (
    statuscode === 401 &&
    origanalRequest === "http://localhost:3000/api/users/refress"
  ) {
    removeItem(KEY_ACCESS_TOKEN);
    const result = await axios.post("http://localhost:3000/api/users/logout");
    window.location.replace("/login");
    // return Promise.reject(error);
  }
  if (statuscode === 401) {
    const respons = await axiosClient.post("api/users/refress");
    if (respons) {
      setItem(KEY_ACCESS_TOKEN, respons.data.result);
      origanalRequest.headers["Authorization"] = `Bearer ${respons}`;
      return axios(origanalRequest);
    }
  }
});

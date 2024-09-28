"use client";
export const KEY_ACCESS_TOKEN = "accessToken";

export function getItems(key: any) {
  const data = localStorage.getItem(key);
  return data;
}

export function setItem(key: any, value: any) {
  return localStorage.setItem(key, value);
}
export function removeItem(key: any) {
  return localStorage.removeItem(key);
}

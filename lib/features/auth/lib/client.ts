import * as SecureStore from "expo-secure-store";

import { createAuthClient } from "better-auth/react";

const BEARER_TOKEN_KEY = "bearer_token";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://192.168.1.88:3000",
  fetchOptions: {
    credentials: "include",
    onSuccess: async ctx => {
      // Store the Bearer token when received from auth endpoints
      const authToken = ctx.response.headers.get("set-auth-token");
      if (authToken) {
        await SecureStore.setItemAsync(BEARER_TOKEN_KEY, authToken);
      }
    },
    onError: async ctx => {
      // Clear token on auth errors
      if (ctx.response.status === 401) {
        await SecureStore.deleteItemAsync(BEARER_TOKEN_KEY);
      }
    },
    auth: {
      type: "Bearer",
      token: async () => {
        const token = await SecureStore.getItemAsync(BEARER_TOKEN_KEY);
        return token || "";
      },
    },
  },
  storage: {
    async get(key: string) {
      return await SecureStore.getItemAsync(key);
    },
    async set(key: string, value: string) {
      await SecureStore.setItemAsync(key, value);
    },
    async remove(key: string) {
      await SecureStore.deleteItemAsync(key);
    },
  },
});

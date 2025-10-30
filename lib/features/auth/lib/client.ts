import * as SecureStore from "expo-secure-store";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://192.168.1.88:3000",
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

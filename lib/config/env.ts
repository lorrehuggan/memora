import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

if (!extra) {
  throw new Error("Expo config extra is not defined. Make sure app.config.js is properly configured.");
}

export const API_URL = extra.apiUrl;
export const BASE_URL = extra.baseUrl;
export const BETTER_AUTH_SECRET = extra.betterAuthSecret;

// Validate required environment variables
if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables");
}

if (!BASE_URL) {
  throw new Error("BASE_URL is not defined in environment variables");
}

if (!BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not defined in environment variables");
}

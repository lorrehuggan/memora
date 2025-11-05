import { Alert } from "react-native";

import { router } from "expo-router";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { authClient } from "@/features/auth/lib/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = async () => {
  const { data, error } = await authClient.signOut({
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://192.168.1.88:8081",
      },
    },
  });
  if (data?.success) {
    Alert.alert(data.success === true ? "Logout successful" : "Logout failed");
    return router.replace("/login");
  } else if (error) {
    Alert.alert(`Logout failed ${error.message}`);
  }
};

import { authClient } from "@/features/auth/lib/client";

import type { GetReflectionOptions, ReflectionResponse } from "../types";

const API_URL = process.env.API_URL;

export async function getReflections(options?: GetReflectionOptions): Promise<ReflectionResponse> {
  try {
    // Get auth token
    const sessionData = await authClient.getSession();
    const authToken = sessionData.data?.session?.token;

    // Build query parameters
    const params = new URLSearchParams();
    if (options?.limit) {
      params.append("limit", options.limit.toString());
    }
    if (options?.offset) {
      params.append("offset", options.offset.toString());
    }

    const url = `${API_URL}/api/reflection${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reflections: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch reflections");
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch reflections");
  }
}

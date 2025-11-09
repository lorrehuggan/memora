import { authClient } from "@/features/auth/lib/client";

import type { MeetingMetadata, UploadResponse } from "../types";

const API_URL = process.env.API_URL;

export async function uploadAudio(
  fileUri: string,
  reflectionId?: string,
  metadata?: MeetingMetadata
): Promise<UploadResponse> {
  try {
    // Get auth token
    const sessionData = await authClient.getSession();
    const authToken = sessionData.data?.session?.token;

    // Generate meeting ID if not provided
    const id = reflectionId || `reflection_${Date.now()}`;

    // Create form data
    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      name: `${id}.m4a`,
      type: "audio/m4a",
    } as unknown as Blob);

    // Add optional metadata fields if provided
    if (metadata?.title?.trim()) {
      formData.append("title", metadata.title.trim());
    }
    if (metadata?.description?.trim()) {
      formData.append("description", metadata.description.trim());
    }
    if (metadata?.reflectionDate?.trim()) {
      formData.append("reflectionDate", metadata.reflectionDate.trim());
    }
    if (metadata?.tags?.trim()) {
      formData.append("tags", metadata.tags.trim());
    }

    // Upload to server
    const response = await fetch(`${API_URL}/api/reflections/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },

      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      recordingId: data.recordingId || data.filePath || data.id || id,

      message: "Upload successful",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Upload failed");
  }
}

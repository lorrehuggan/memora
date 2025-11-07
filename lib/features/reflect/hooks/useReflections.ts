import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getReflections } from "../services/refelection";
import { uploadAudio } from "../services/upload";
import type { GetReflectionOptions, UploadAudioVariables, UploadResponse } from "../types";

export const REFLECTION_QUERY_KEY = "reflections";

export function useReflections(options?: GetReflectionOptions) {
  return useQuery({
    queryKey: [REFLECTION_QUERY_KEY, options],
    queryFn: () => getReflections(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useInvalidatReflections() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: [REFLECTION_QUERY_KEY],
    });
  };
}

export function useAudioUpload() {
  const queryClient = useQueryClient();

  return useMutation<UploadResponse, Error, UploadAudioVariables>({
    mutationFn: ({ fileUri, meetingId, metadata }) => uploadAudio(fileUri, meetingId, metadata),
    onSuccess: () => {
      // Invalidate meetings query to refresh the list
      queryClient.invalidateQueries({
        queryKey: [REFLECTION_QUERY_KEY],
      });
    },
  });
}

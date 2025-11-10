import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/lib/config/env";
import { useQueryClient } from "@/lib/query/useQueryClient";

import { authClient } from "../auth/lib/client";

export const HEALTH_QUERY_KEY = "health";

export function useAuthHealthTest() {
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    const response = await authClient.$fetch(`${API_URL}/api/health/auth`);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HEALTH_QUERY_KEY] });
    },
  });
}

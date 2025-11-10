import { authClient } from "../lib/client";

export const useAuthHeaders = () => {
  const { data: session } = authClient.useSession();

  return {
    headers: {
      Authorization: session?.session?.token ? `Bearer ${session.session.token}` : "",
    },
  };
};

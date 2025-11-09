import { createContext } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
    mutations: {
      retry: 2,
    },
  },
});

export const QueryContext = createContext<QueryClient | null>(null);

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={queryClient}>{children}</QueryContext.Provider>
    </QueryClientProvider>
  );
};

export { queryClient };

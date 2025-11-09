import { useContext } from "react";

import { QueryContext } from "./provider";

export function useQueryClient() {
  const client = useContext(QueryContext);
  if (!client) {
    throw new Error("useQueryClient must be used within a QueryProvider");
  }
  return client;
}

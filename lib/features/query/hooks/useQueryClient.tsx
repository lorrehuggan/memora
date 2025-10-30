import { useContext } from "react";

import { QueryContext } from "../lib/Provider";

export function useQueryClient() {
  const client = useContext(QueryContext);
  if (!client) {
    throw new Error("useQueryClient must be used within a QueryProvider");
  }
  return client;
}

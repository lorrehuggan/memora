import { AuthProvider } from "@/features/auth/lib/Provider";
import { QueryProvider } from "@/features/query/lib/Provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}

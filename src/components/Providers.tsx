"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

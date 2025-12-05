'use client';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
    </SessionProvider>
    );
}
'use client';

import { ToastProvider } from './Toast';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}

import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';

export const metadata: Metadata = {
  title: 'thru.us',
  description: 'The relationship infrastructure that mission orgs run on',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

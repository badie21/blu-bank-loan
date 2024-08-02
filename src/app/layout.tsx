import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ReduxProvider from '../redux/provider';
import { Layout } from 'components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <ReduxProvider>
          <Layout>{children}</Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}

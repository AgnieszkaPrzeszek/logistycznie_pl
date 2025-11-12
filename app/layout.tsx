import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Recursive } from 'next/font/google';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'LogistyczniePL',
  description: 'LogistyczniePL to platforma łącząca użytkowników z firmami logistycznymi.',
};

const recursive = Recursive({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>{children}</body>
    </html>
  );
}

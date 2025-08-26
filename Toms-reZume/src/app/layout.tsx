import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './font.css';

const inter = Inter({
  subsets: ['latin'],
});

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://toms-re-zume.vercel.app'
      : 'http://localhost:3000'
  ),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
      </head>
      <body>{children}</body>
    </html>
  );
}

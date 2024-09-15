import type { Metadata } from 'next';
// import { Inter as FontSans } from 'next/font/google';
// import { Righteous as Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import localFont from "next/font/local";


import { cn } from '@/lib/utils';

const fontSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: '--font-sans',
  weight: "100 900",
});
const fontDisplay = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-display",
  weight: "100 900",
  preload: false,
});


export const metadata: Metadata = {
  title: 'genstagram',
  description: 'Ranked feed of gen-art channel',
  openGraph: {
    title: 'genstagram',
    description: 'Ranked feed of gen-art channel',
    url: 'https://genstagram.koda.art',
    siteName: 'genstagram',
    images: [
      {
        url:`https://genstagram.koda.art/og.png`,
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'genstagram',
    description: 'Ranked feed of gen-art channel',
    creator: '@koda',
    images: ['https://www.genstagram.koda.art/og.png'], // Must be an absolute URL
  },
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
            <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>

      <body
        className={cn(
          'min-h-screen w-full flex flex-col items-center justify-center bg-background font-sans antialiased',
          fontSans.variable,
          fontDisplay.variable,
        )}
      >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
      </body>
    </html>
  );
}

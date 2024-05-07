import type { Metadata } from "next";
import "./globals.css";
import RootProvider from '@/providers/root'
import Script from 'next/script'
import { fontSans } from '@/app/fonts'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import RootLayout from '@/components/ui/layout'


export const metadata: Metadata = {
  title: "DraGo - 911 for your business logistics",
  description: "Logistic software tools for your business",
};

const isProduction = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_NODE_ENV === 'production'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {isProduction && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
          <Script id='google-analytics'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
      <Script async type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`} />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <RootProvider>
          <RootLayout>
            {children}
            {isProduction && <Analytics />}
            <Toaster />
          </RootLayout>
        </RootProvider>
      </body>
    </html>
  );
}

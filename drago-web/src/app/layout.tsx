import type { Metadata } from "next";
import "./globals.css";
import RootProvider from '@/providers/root'
import Script from 'next/script'
import Header from '@/components/Header'
import { fontSans } from '@/app/fonts'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'


export const metadata: Metadata = {
  title: "DraGo - 911 for your business logistics",
  description: "Logistic software tools for your business",
};

const isProduction = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_NODE_ENV === 'production'

export default function RootLayout({
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
          <div className="flex flex-col h-dvh">
            <div>
              <Header />
            </div>
            <div className="grow">
              {children}
              {isProduction && <Analytics />}
              <Toaster />
            </div>
            <div className="flex flex-row text-sm content-center md:justify-center justify-between items-center w-full">
              <p className="my-2 mx-4">&copy; {new Date().getFullYear()} &#x2022; Drago Technologies Ltd</p>
              <a className="mr-4 md:mr-0" href="mailto:lomoloedwin@gmail.com">Contact</a>
            </div>
          </div>
        </RootProvider>
      </body>
    </html>
  );
}

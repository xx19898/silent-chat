import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import {Provider} from 'jotai'
const poppins = Poppins({
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Nevil chat",
  description: "p chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head />
        <body className={poppins.className}>
          <Provider>
          <Providers>
            {children}
          </Providers>
          </Provider>
        </body>
      </html>
  );
}

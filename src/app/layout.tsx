"use client";
import Providers from "@/redux/provider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Chat-app</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
        <ProgressBar
          height="4px"
          color="#4752C4"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </body>
    </html>
  );
}

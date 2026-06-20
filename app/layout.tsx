import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { MessageSoundListener } from "@/components/message-sound-listener";
import { Notification } from "@/features/notification/components/notification";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "wlm",
};

const segoeUI = localFont({
  src: "../public/fonts/SegoeUI.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${segoeUI.className} text-sm antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MessageSoundListener />
          <Notification />
          {children}
          
        </ThemeProvider>
      </body>
    </html>
  );
}

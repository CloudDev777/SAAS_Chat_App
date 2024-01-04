import type { Metadata } from "next";
import "./globals.css";

import ClientProviders from "@/components/ClientProviders";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import SubscriptionProvider from "@/components/SubscriptionProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Chat Multilingual",
  description: "Created as a sample work by Adeel Imran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                {children}
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
          <Toaster />
        </body>
      </html>
    </ClientProviders>
  );
}

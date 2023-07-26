import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import ThemeProviders from "@/components/ThemeProviders";
import { Toaster } from "@/components/ui/Toaster";
import { siteConfig } from "../../config/site";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: true,
});

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
  preload: true,
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <Providers>
          <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
            <main>{children}</main>
            <Toaster />
          </ThemeProviders>
        </Providers>
      </body>
    </html>
  );
}

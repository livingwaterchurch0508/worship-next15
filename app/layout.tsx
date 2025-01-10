import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";

import { ThemeProvider } from "@/app/components/theme-provider";
import { AppSidebar } from "@/app/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar";
import { Separator } from "@/app/components/ui/separator";
import { ModeToggle } from "@/app/components/mode-toggle";
import { AppBreadcrumbs } from "@/app/components/app-breadcrumbs";
import NavSearchBar from "@/app/components/nav/nav-search-bar";
import NavHomework from "@/app/components/nav/nav-homework";
import NavInfo from "@/app/components/nav/nav-info";
import { Toaster } from "@/app/components/ui/toaster";
import UpdateMetadata from "@/app/components/update-metadata";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "생수가 흐르는 교회💒 찬양집",
  description: "생수가 흐르는 교회에 오신걸 환영합니다!",
  manifest: "/manifest.json",
  openGraph: {
    title: "생수가 흐르는 교회💒",
    description: "생수가 흐르는 교회에 오신걸 환영합니다!",
    siteName: "생수가 흐르는 교회💒 찬양집",
    images: [
      {
        url: "https://livingwater-church.co.kr/home_banner.png",
        width: 1134,
        height: 805,
        alt: "홈 배너",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "https://livingwater-church.co.kr/home_banner.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>생수가 흐르는 교회💒 찬양집</title>
        <meta
          name="description"
          content="생수가 흐르는 교회에 오신걸 환영합니다!"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/carousel/cross.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UpdateMetadata />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider open={false}>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                <SidebarTrigger className="-ml-1 md:hidden" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 md:hidden"
                />
                <AppBreadcrumbs />

                <div className="ml-auto px-3">
                  <div className="flex items-center gap-2 text-sm">
                    <NavSearchBar />
                    <NavHomework />
                    <NavInfo />
                    <ModeToggle />
                  </div>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

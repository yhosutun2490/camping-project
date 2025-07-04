import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNavBar from "@/components/HeaderNavBar";
import Toast from "@/components/Toast";
import LayoutContentWrapper from "@/components/LayoutContentWrapper";
import { getUserInfo } from "@/api/server-components/checkUser"
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "森森不息 - 走進森林享受不息的感動",
  description: "探索露營活動，享受大自然的美好",
  icons: {
    icon: '/header/logo_icon.svg'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden antialiased h-screen flex flex-col`}
      >
        <HeaderNavBar 
          userId={user?.data?.member?.id?? ''}
          username={user?.data?.member?.username ?? ''} 
          userRole={user?.data?.member?.role}
          userData={
            user?.data?.member
              ? user?.data?.member
              : undefined
          }
        />
        <LayoutContentWrapper>
           {children}
        </LayoutContentWrapper>
        <Toast />
      </body>
    </html>
  );
}

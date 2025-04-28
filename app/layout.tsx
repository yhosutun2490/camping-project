import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNavBar from "@/components/HeaderNavBar";
import Toast from "@/components/Toast";
import {userVerifyToken} from "@/api/utils/auth-server"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await userVerifyToken();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <HeaderNavBar username={user?.data?.member?.username??''}/>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <Toast />
      </body>
    </html>
  );
}

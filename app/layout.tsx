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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderNavBar user={user}/>
        {children}
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to nextjs.org →
          </a>
        </footer>
        <Toast />
      </body>
    </html>
  );
}

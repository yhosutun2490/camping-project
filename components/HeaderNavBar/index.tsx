"use client";
import Link from "next/link";
import Image from "next/image";
import LoginLabelModal from "@/components/LoginLabelModal";
import RegisterModal from "@/components/RegisterModal";
import MemberMenu from "@/components/HeaderNavBar/MemberMenu";
import HeaderSearchBarForm from "../HeaderSearchBarForm";

import { usePathname, useRouter } from "next/navigation";
import CreateHostModal from "../CreateHostModal";

interface PropsType {
  username: string;
  userRole?: string;
}

export default function HeaderNavBar({ username, userRole }: PropsType) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // 檢查使用者是否為主辦方
  const isHost = userRole === "host";

  return (
    <div
      className={[
        "navbar fixed inset-x-0  w-full px-[10%] z-10 cursor-pointer",
        isHome ? "bg-transparent" : "bg-white shadow-md",
      ].join(" ")}
    >
      <div className="flex flex-1 items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/header/logo_icon.svg"
            width={35}
            height={35}
            alt="Logo"
          />
             <p
            className="relative ml-2 inline-block text-neutral-950 text-base hover:text-primary-500"
          >
           森森不息
          </p>
        </Link>
      </div>
      <div className="header_search_bar mx-auto max-w-[500px] h-[64px]">
        <HeaderSearchBarForm />
      </div>
      <div className="flex item-center space-x-4 h-full">
        <Link href="/event" className="flex items-center">
          <p
            className="relative inline-block text-neutral-950 text-base hover:text-primary-500"
          >
            活動列表
          </p>
        </Link>

        {username ? (
          isHost ? (
            <Link href="/create-activity" className="flex items-center">
                 <p
            className="relative inline-block text-neutral-950 text-base hover:text-primary-500"
          >
           辦活動
          </p>
            </Link>
          ) : (
            <CreateHostModal
              onSuccess={() => {
                router.refresh();
                router.push("/create-activity");
              }}
            />
          )
        ) : null}

        {username ? (
          <MemberMenu user={username} />
        ) : (
          <div className="flex space-x-3">
            <LoginLabelModal />
            <RegisterModal />
          </div>
        )}
      </div>
    </div>
  );
}

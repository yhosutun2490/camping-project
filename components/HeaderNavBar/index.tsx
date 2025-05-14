"use client";
import Link from "next/link";
import Image from "next/image";
import LoginLabelModal from "@/components/LoginLabelModal";
import RegisterModal from "@/components/RegisterModal";
import MemberMenu from "@/components/HeaderNavBar/MemberMenu";
import HeaderSearchBarForm from "../HeaderSearchBarForm";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import CreateHostModal from "../CreateHostModal";
import clsx from "clsx";

interface PropsType {
  username: string;
  isBarOpen?: boolean;
  userRole?: string;
}

export default function HeaderNavBar({
  username,
  userRole,
  isBarOpen,
}: PropsType) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [isBarScaleUp, setIsBarScaleUp] = useState<boolean>(isBarOpen || false);
  const headerSearchBarRef = useRef<HTMLDivElement | null>(null);
  // 檢查使用者是否為主辦方
  const isHost = userRole === "host";

  return (
    <div
      className={clsx(
        "navbar fixed inset-x-0 w-full flex justify-between px-[8%] py-0 h-20 z-20 cursor-pointer delay-50 ease-in-out transition-all",
        {
          "bg-transparent": isHome && !isBarScaleUp,
          "bg-white shadow-md": !isHome,
        },
        isBarScaleUp ? "bg-zinc-50" : ""
      )}
    >
      <div className="flex items-center h-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/header/logo_icon.svg"
            width={35}
            height={35}
            alt="Logo"
          />
          <p className="relative ml-2 inline-block text-neutral-950 text-base hover:text-primary-500">
            森森不息
          </p>
        </Link>
      </div>
      {/* 搜尋列 */}
      <div
        className={clsx(
          "header_search_bar mx-auto absolute left-0 right-0 ease-in-out duration-200 ",
          isBarScaleUp
            ? "top-[60px] w-full h-[120px] px-[10%] bg-zinc-50 transition-all"
            : "w-[30%] h-12 px-0 transition-none"
        )}
        ref={headerSearchBarRef}
        onClick={() => setIsBarScaleUp(true)}
      >
        {isBarScaleUp && (
          <div
            className="text-xl text-primary-500 text-center mb-4"
            onClick={(e) => {
              e.stopPropagation();
              setIsBarScaleUp(false);
            }}
          >
            想去哪/糾團去/隨時出發
          </div>
        )}
        <div className={`h-14
          ${isBarScaleUp
            ? "left-0 right-0 h-14 px-[10%] bg-zinc-50"
            : "w-full h-12"
          }`}>
          <HeaderSearchBarForm isBarOpen={isBarScaleUp} />
        </div>

      </div>
      <div className="flex item-center space-x-4 h-10">
        <Link href="/event" className="flex items-center">
          <p className="relative inline-block text-neutral-950 text-base hover:text-primary-500">
            活動列表
          </p>
        </Link>

        {username ? (
          isHost ? (
            <Link href="/create-activity" className="flex items-center">
              <p className="relative inline-block text-neutral-950 text-base hover:text-primary-500">
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
      {/* 半透明遮罩層，點擊可關閉搜尋放大 */}
      {isBarScaleUp && (
        <div
          className="fixed top-[180px] left-0 w-full h-full bg-black/50 opacity-50 z-10"
          onClick={() => setIsBarScaleUp(false)}
        />
      )}
    </div>
  );
}

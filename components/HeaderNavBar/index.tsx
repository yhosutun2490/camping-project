"use client";
import Link from "next/link";
import Image from "next/image";
import LoginLabelModal from "@/components/LoginLabelModal";
import RegisterModal from "@/components/RegisterModal";
import MemberMenu from "@/components/HeaderNavBar/MemberMenu";
import HeaderSearchBarForm from "../HeaderSearchBarForm";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import CreateHostModal from "../CreateHostModal";
import clsx from "clsx";
import useClickOutside from "@/hook/useClickOutSide";
import { useTopIntersectStore } from "@/stores/topIntersectStore";
import { useMemberLogin } from "@/stores/useMemberLogin";
import ShoppingCartIcon from "./ShoppingCartIcon";
import type { UserCheckData } from "@/types/api/auth";

interface PropsType {
  username: string;
  isBarOpen?: boolean;
  userRole?: string;
  userData?: UserCheckData | null; // 登入後會員資料 同步於store使用
}

export default function HeaderNavBar({
  username,
  userRole,
  isBarOpen,
  userData,
}: PropsType) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [isBarScaleUp, setIsBarScaleUp] = useState<boolean>(isBarOpen || false);
  const headerSearchBarRef = useRef<HTMLDivElement | null>(null);
  // 檢查使用者是否為主辦方
  const isHost = userRole === "host";
  // 點擊外部就收起
  useClickOutside(headerSearchBarRef, () => setIsBarScaleUp(false));
  // 是否進入首頁置頂區塊
  const isTopSectionVisible = useTopIntersectStore((s) => s.isTopVisible);
  // 會員資料同步於zustand store useEffect避免影響渲染副作用

  useEffect(() => {
    if (userData) {
      useMemberLogin.getState().setMember(userData);
    } else {
      useMemberLogin.getState().reset();
    }
  }, [userData]); 

  return (
    <div
      className={clsx(
        "navbar fixed inset-x-0 w-full h-[130px] items-start md:h-[80px] md:items-center",
        "flex flex-wrap justify-between px-[1rem] sm:px-[6%] lg:px-[8%] z-20 cursor-pointer delay-50 ease-in-out transition-all",
        {
          "bg-transparent": isHome && !isBarScaleUp,
          "bg-white shadow-md": !isHome || !isTopSectionVisible,
        },
        isBarScaleUp ? "bg-white" : ""
      )}
    >
      <div className="flex items-center h-10 z-1">
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
      {
        <div
          className={clsx(
            "header_search_bar absolute top-[60px] mx-auto lg:pl-[10%]",
            "left-[5%] sm:left-[20%] md:right-[28%] xl:right-[10%] md:top-[17px] md:left-0 overflow-visible ease-in-out",
            isBarScaleUp
              ? "top-[25px] w-full h-[120px] px-[10%] bg-white duration-300"
              : "w-[calc(100%-4rem)] sm:w-[450px] md:w-[250px] lg:w-[450px] h-12 px-0 transition-[width] duration-200 transition-[top] duration-600",
            (!isTopSectionVisible && isHome) || !isHome ? "block" : "hidden"
          )}
          ref={headerSearchBarRef}
          onClick={() => {
            if (window.innerWidth >= 1124) {
              setIsBarScaleUp(true);
            }
          }}
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

          <div
            className={`h-14
          ${
            isBarScaleUp
              ? "left-0 right-0 h-14 px-[10%] bg-white"
              : "w-full h-12"
          }`}
          >
            <HeaderSearchBarForm
              isBarOpen={isBarScaleUp}
              setIsBarScaleUp={setIsBarScaleUp}
            />
          </div>
        </div>
      }
      {/* 半透明遮罩層，點擊可關閉搜尋放大 */}
      {isBarScaleUp && (
        <div
          className="fixed top-[135px] left-0 w-full h-full bg-black/50 opacity-50 z-5"
          onClick={() => setIsBarScaleUp(false)}
        />
      )}
      <div className="flex item-center space-x-1 md:space-x-4 h-10 z-1">
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

        {/**購物車icon */}
        <ShoppingCartIcon />

        {username ? (
          <MemberMenu user={username} />
        ) : (
          <div className="flex space-x-1 md:space-x-3">
            <LoginLabelModal />
            <RegisterModal />
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import HostActivities from "./components/HostActivities";
import { HostProfile } from "./components/HostProfile";

export default function HostPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8 text-neutral-900">主辦</h1>
      
      {/* 主辦方個人資料區塊 */}
      <div className="mb-8">
        <HostProfile />
      </div>
      
      {/* 活動列表區塊 */}
      <div className="mb-8">
        <HostActivities />
      </div>
    </>
  );
}

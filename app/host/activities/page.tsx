"use client";

import React from "react";
import HostActivities from "../components/HostActivities";

export default function ActivitiesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8 text-neutral-900">活動列表</h1>
      
      <div className="mb-8">
        <HostActivities />
      </div>
    </>
  );
}

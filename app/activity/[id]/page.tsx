"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation";

type Activity = {
  id: string;
  title: string;
  description: string;
};

async function getActivityById(id: string): Promise<Activity> {
  // 模擬 API 呼叫
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: `活動標題 #${id}`,
        description: "這是一個活動的說明內容。",
      });
    }, 500); // 模擬延遲
  });
}
export default function ActivityPage() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getActivityById(id);
        setActivity(res);
      } catch (err) {
        console.error("載入活動資料失敗", err);
      }
    };
    fetchData();
  }, [id]);

  if (!activity) {
    return <p>載入中...</p>;
  }

  return (
    <div>
      <h1>{activity.title}</h1>
      <p>{activity.description}</p>
      <p>活動 ID：{activity.id}</p>
    </div>
  );
}
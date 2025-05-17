import CommentCard from "@/components/CommentCard";

export default function CommentSection() {
  interface CommentData {
    userInfo: {
      user_id: string;
      name: string;
      image: string;
    };
    eventInfo: {
      event_id: string;
      event_name: string;
      host_id: string;
      host_name: string;
    };
    comment: {
      id: string;
      description: string;
      date: string;
      rating: number;
    };
  }
  const sampleComment: CommentData[] = [
    {
      userInfo: {
        user_id: "u001",
        name: "陳明輝",
        image: "/header/user_image.jpg",
      },
      eventInfo: {
        event_id: "e101",
        event_name: "松林谷地露營區",
        host_id: "h1001",
        host_name: "蔚然海岸",
      },
      comment: {
        id: "c0001",
        description: "環境非常優美，樹木扶疏提供良好的遮蔭。營地平整且寬敞，方便帳篷搭建。廁所及淋浴設施乾淨整潔，管理人員服務態度親切。夜晚可以清楚看到滿天星斗，早晨還有機會看到壯麗的日出。絕對會再次造訪！",
        date: "2025-01-01",
        rating: 5,
      },
    },
    {
      userInfo: {
        user_id: "u002",
        name: "林佳穎",
        image: "/header/user_image.jpg",
      },
      eventInfo: {
        event_id: "e102",
        event_name: "藍海灣露營地",
        host_id: "h1002",
        host_name: "嘎嘎作響",
      },
      comment: {
        id: "c0002",
        description: "位置靠近海邊最好的，但風稍強平是白天的（防曬）。有防風牆和樹遮擋視野的山。廚房設施完善，有提供基本調味料。夜晚可以聽到海浪聲，非常放鬆。少了一顆星是因為衛浴設施數量不足，尖峰時段需要排隊",
        date: "2025-05-05",
        rating: 4,
      },
    },
    {
      userInfo: {
        user_id: "u003",
        name: "張志豪",
        image: "/header/user_image.jpg",
      },
      eventInfo: {
        event_id: "e103",
        event_name: "楓葉谷露營區",
        host_id: "h1003",
        host_name: "QQ波霸",
      },
      comment: {
        id: "c0003",
        description: "秋季前往，紅葉美不勝收！營區規劃用心，每個營位都有獨立用電及用水設施。公共區域寬敞舒適，提供兒童遊樂設施。夜間照明適中，不會過亮影響睡眠品質。營主很貼心，還提供了當地特產和手工麵包。強烈推薦給家庭出 ...",
        date: "2025-05-12",
        rating: 5,
      },
    },
  ];

  return (
    <main
      className="relative text-neutral-950 text-4xl px-[8%] pt-[10%] py-[178px]
    lg:pt-[120px] lg:px-[10%] 2xl:px-[16%] 
    flex flex-col gap-[1.25rem] lg:gap-[40px] text-center"
    >
      <p>最新評論</p>
      <div className="comment_lists w-full grid grid-cols-1 lg:grid-cols-3 gap-[2rem]">
        {sampleComment.map((item, idx) => {
          return (
            <div key={idx}>
              <CommentCard
                userInfo={item.userInfo}
                eventInfo={item.eventInfo}
                comment={item.comment}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}

import IntroCard from "./IntroCard";
export default function ActivityIntroSection() {
  const eventsIntroData = [
    {
      id: "1",
      rating: 1,
      image: "/main/intro/lazy_camp.png",
      description: {
        title: "懶人豪華露營",
        subtitle: "不需要裝備及自行準備餐點",
      },
    },
    {
      id: "2",
      rating: 3,
      image: "/main/intro/beginner_camp.png",
      description: {
        title: "新手友善",
        subtitle: "有基本露營經驗，想挑戰自行搭帳煮飯樂趣",
      },
    },
    {
      id: "3",
      rating: 4,
      image: "/main/intro/challenge_camp.png",
      description: {
        title: "進階挑戰",
        subtitle: "適合對象已具備豐富露營經驗，想嘗試更硬核的挑戰 ",
      },
    },
  ];

  return (
    <main
      className="h-full relative text-neutral-950 px-[5%] py-[10%] 
            lg:py-[120px] 2xl:px-[12%] flex flex-col gap-[1.5rem] lg:gap-[40px] text-center"
    >
      <div className="title space-y-[0.75rem]">
        <p className="text-2xl lg:text-3xl font-semibold">活動攻略大補帖</p>
        <p className="lg:text-2xl">
          不管你是剛要參加活動的小白，還是身經百戰已參加多數活動的人，我們都有適合的行程提供考
        </p>
      </div>

      <div className="about_us_cards_wrapper lg:grid lg:grid-cols-3 lg:space-x-4 space-y-4">
        {eventsIntroData.map((item) => {
          return (
            <div key={item.id}>
              <IntroCard data={item} />
            </div>
          );
        })}
      </div>
    </main>
  );
}

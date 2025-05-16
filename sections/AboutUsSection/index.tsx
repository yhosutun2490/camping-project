
import AboutUsCard from "../../components/AboutUsCard"

export default function AboutUsSection() {
    const aboutCardData = [
        {
            id: '1',
            title: '露營活動最多項',
            image: '/main/about/camping.svg',
            description: '提供最豐富的露營活動，結合大自然體驗，滿足親子、伴侶及冒險探索等多元需求。'
        },
        {
            id: '2',
            title: '一站式舉辦露營活動',
            image: '/main/about/desktop_mac.svg',
            description: '提供全方位的露營活動體驗，讓參加者可以一次性安排所有需要的設備、服務和活動，而不需要額外準備。'
        },
        {
            id: '3',
            title: '露營活動票卷多元性',
            image: '/main/about/local_activity.svg',
            description: '針對不同族群（家庭、朋友、公司團體）提供不同的活動內容，確保所有參與者都能找到適合自己的體驗。'
        },
        {
            id: '4',
            title: '取消免手續負擔',
            image: '/main/about/money_off.svg',
            description: '取消預約時的便利性，無須支付額外的取消手續費。'
        },
    ]

    return (
        <main className="h-full relative text-neutral-950 px-[5%] py-[10%] 
        lg:py-[120px] 2xl:px-[12%] flex flex-col gap-[1.5rem] lg:gap-[40px] text-center">
            <div className="title space-y-[0.75rem]">
                <p className="text-2xl lg:text-3xl font-semibold">森森不息是你最佳的夥伴</p>
                <p className="lg:text-2xl">至今已在全台灣辦了10000場的活動，幫助了超過5000位活動主發起活動</p>
            </div>
         
            <div className="about_us_cards_wrapper lg:grid lg:grid-cols-4 lg:space-x-4 space-y-4">
                {aboutCardData.map(item => {
                    return (
                        <div key={item.id}>
                            <AboutUsCard data={item} />
                        </div>
                    )
                })}
            </div>
        </main>)
}
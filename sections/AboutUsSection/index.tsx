
import AboutUsCard from "./AboutUsCard"

export default function AboutUsSection() {
    const aboubUsData = [
        {
            id: '1',
            title: '露營活動最多項',
            image: '/main/about/camping.svg',
            description: '提供最豐富的露營活動，結合大自然體驗，滿足親子、伴侶及冒險探索等多元需求。'
        },
        {
            id: '2',
            title: '露營活動最多項',
            image: '/main/about/camping.svg',
            description: '提供最豐富的露營活動，結合大自然體驗，滿足親子、伴侶及冒險探索等多元需求。'
        },
        {
            id: '3',
            title: '露營活動最多項',
            image: '/main/about/camping.svg',
            description: '提供最豐富的露營活動，結合大自然體驗，滿足親子、伴侶及冒險探索等多元需求。'
        },
        {
            id: '4',
            title: '露營活動最多項',
            image: '/main/about/camping.svg',
            description: '提供最豐富的露營活動，結合大自然體驗，滿足親子、伴侶及冒險探索等多元需求。'
        },
    ]

    return (
        <main className="h-full relative text-neutral-950 text-4xl px-[8%] 
        lg:py-[120px] lg:px-[16%] flex flex-col gap-[1.25rem] lg:gap-[40px] text-center">
            <p>森森不息是你最佳的夥伴</p>
            <p className="text-2xl">至今已在全台灣辦了10000場的活動，幫助了超過5000位活動主發起活動</p>
            <div className="about_us_cards_wrapper">
                {aboubUsData.map(item => {
                    return (
                        <div key={item.id}>
                            <AboutUsCard data={item} />
                        </div>
                    )
                })}
            </div>
        </main>)
}
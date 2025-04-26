import SearchSection from "@/sections/SearchSection";
import BestActivitySection from "@/sections/BestActivitySection";
import ActivityIntroSection from "@/sections/ActivityIntro";
import TopPlaceSection from "@/sections/TopPlaceSection";
import CommentSection from "@/sections/CommentSection";
export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen divide-5 font-[family-name:var(--font-geist-sans)]">
      <section id="search-section" className="w-full h-[100dvh] relative px-4 scroll-mt-24 bg-[url('/main/main_bg_top.jpg')] bg-fixed bg-cover bg-center bg-no-repeat">
        <SearchSection />
      </section>
      <section id="search-section" className="w-full h-[100dvh] px-4 scroll-mt-24 bg-primary-50">
        <BestActivitySection />
      </section>
      <section id="best-activities" className="w-full h-[100dvh] pt-[80px] px-4 scroll-mt-24 bg-white bg-fixed bg-[url('/main/bg_event_intro.png')] 
      bg-bottom bg-no-repeat bg-[length:100%_50%]">
        <ActivityIntroSection />
      </section>
      <section id="top-place" className="w-full h-[20dvh] px-4 scroll-mt-24">
        <TopPlaceSection />
      </section>
      <section id="comment" className="w-full h-[20dvh] px-4 scroll-mt-24">
        <CommentSection />
      </section>
    </div>
  );
}

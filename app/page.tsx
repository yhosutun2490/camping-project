import SearchSection from "@/sections/SearchSection";
import BestActivitySection from "@/sections/BestActivitySection";
import ActivityIntroSection from "@/sections/ActivityIntro";
import TopPlaceSection from "@/sections/TopPlaceSection";
import CommentSection from "@/sections/CommentSection";
export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen divide-5 gap-16 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section id="search-section" className="w-full h-[20dvh] px-4 scroll-mt-24">
        <SearchSection />
      </section>
      <section id="search-section" className="w-full h-[20dvh] px-4 scroll-mt-24">
        <BestActivitySection />
      </section>
      <section id="best-activities" className="w-full h-[20dvh] px-4 scroll-mt-24">
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

import SearchSection from "@/sections/SearchSection";
import BestActivitySection from "@/sections/BestActivitySection";
import ActivityIntroSection from "@/sections/ActivityIntro";
import TopPlaceSection from "@/sections/TopPlaceSection";
import CommentSection from "@/sections/CommentSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="w-full h-[100dvh] overflow-x-hidden overflow-y-auto items-center divide-5 font-[family-name:var(--font-geist-sans)]">
      <section id="search-section" className="w-full h-[100dvh]">
        <SearchSection />
      </section>
      <section id="search-section" className="w-full h-[100dvh] px-4 scroll-mt-24 bg-primary-50">
        <BestActivitySection />
      </section>
      <section id="best-activities" className="w-full h-[100dvh] pt-[80px] px-4 scroll-mt-24 bg-white bg-fixed bg-[url('/main/bg_event_intro.png')] 
      bg-bottom bg-no-repeat bg-[length:100%_50%]">
        <ActivityIntroSection />
      </section>
      <section id="top-place" className="w-full h-[100dvh] px-4 scroll-mt-24">
        <TopPlaceSection />
      </section>
      <section id="comment" className="w-full h-[100dvh] px-4 scroll-mt-24">
        <CommentSection />
      </section>
      <Footer />
    </div>
  );
}

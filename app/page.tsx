import SearchSection from "@/sections/SearchSection";
import BestActivitySection from "@/sections/BestActivitySection";
import AboutUsSection from "@/sections/AboutUsSection";
import ActivityIntroSection from "@/sections/ActivityIntro";
import TopPlaceSection from "@/sections/TopPlaceSection";
import CommentSection from "@/sections/CommentSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto items-center divide-5 font-[family-name:var(--font-geist-sans)]">
      <section id="search-section" className="w-full h-full">
        <SearchSection />
      </section>
      <section id="best-section" className="w-full min-h-[70dvh] sm:min-h-screen scroll-mt-24 bg-primary-50">
        <BestActivitySection />
      </section>
      <section id="about-us-section" className="w-full min-h-screen scroll-mt-24 bg-white">
        <AboutUsSection />
      </section>
      <section id="event-intro-section" className="w-full min-h-screen pt-[80px]scroll-mt-24 bg-white bg-fixed bg-[url('/main/bg_event_intro.png')] 
      bg-bottom bg-no-repeat bg-[length:100%_50%]">
        <ActivityIntroSection />
      </section>
      <section id="top-place" className="w-full min-h-screen scroll-mt-24">
        <TopPlaceSection />
      </section>
      <section id="comment" className="w-full min-h-[57dvh] scroll-mt-24 
      bg-[url('/main/comment/comment_bg_mobile.png')]
      md:bg-[url('/main/comment/comment_bg.png')] bg-bottom bg-no-repeat bg-[length:100%_20%]">
        <CommentSection />
      </section>
      <section id="footer" className="w-full min-h-[34dvh] scroll-mt-24 bg-white 
      px-[1rem] py-[1.5rem] lg:px-[15%] lg:py-[40px]" >
         <Footer />
      </section>
    </div>
  );
}

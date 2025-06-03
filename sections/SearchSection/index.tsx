import BackgroundSlider from "@/components/BackgroundSlider";
import SearchBarForm from "@/components/SearchBarForm";
import TopSectionObserver from "@/sections/TopSectionObserver";

const slides = [
  "/main/main_bg_top_1.jpg",
  "/main/main_bg_top_2.jpg",
  "/main/main_bg_top_3.jpg",
];
export default function SearchSection() {
  return (
    <TopSectionObserver>
      <main className="w-screen h-full relative text-white">
        <BackgroundSlider slides={slides} >
          走進森林 <br/> 享受不息的感動
        </BackgroundSlider>
        <div className="absolute z-1 left-[50%] bottom-[15%] translate-[-50%] w-[95%] sm:w-[80%]">
          <SearchBarForm />
        </div>
      </main>
    </TopSectionObserver>
  );
}

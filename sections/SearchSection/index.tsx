import BackgroundSlider from "@/components/BackgroundSlider";
import SearchBarForm from "@/components/SearchBarForm";
import TopSectionObserver from "@/sections/TopSectionObserver";

export default function SearchSection() {
  return (
    <TopSectionObserver>
      <main className="w-screen h-full relative text-white">
        <BackgroundSlider />
        <div className="absolute z-1 left-[50%] bottom-[15%] translate-[-50%] w-[95%] sm:w-[80%]">
          <SearchBarForm />
        </div>
      </main>
    </TopSectionObserver>
  );
}

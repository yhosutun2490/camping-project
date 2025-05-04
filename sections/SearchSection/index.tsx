import BackgroundSlider from "@/components/BackgroundSlider";
import SearchBarForm from "@/components/SearchBarForm";
export default function SearchSection() {
  return (
    <main className="w-screen h-full relative">
      <BackgroundSlider />
      <div className="absolute left-[50%] bottom-[15%] translate-[-50%] w-[80%]">
        <SearchBarForm />
      </div>
    </main>
  );
}

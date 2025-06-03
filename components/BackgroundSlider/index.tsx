"use client"

import Image from "next/image"
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react"
import { useEffect,useState } from "react"

interface Props {
  slides: string[]
  children?: React.ReactNode
}
export default function BackgroundSlider({slides, children}:Props) {
  // 目前觀看的slider
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  // 設定 loop、自動播放速度等等
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true,})

  // 註冊active slider註冊active slider
  useEffect(() => {
    if (!emblaApi) return

    // 初始執行一次，保證 currentSlide 正確
    setCurrentSlide(emblaApi.selectedScrollSnap())

    // 每當選到新 slide，觸發 onSelect
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    return () => {emblaApi.off("select", onSelect)}
  }, [emblaApi])

  return (
    <div className="background_slider relative overflow-hidden w-full h-screen" ref={emblaRef}>
      {/* Slide Container 必須是 flex 才能水平排列 */}
      <div className="flex h-full">
        {slides.map((src, idx) => (
          <div key={idx} className="relative flex-shrink-0 w-full h-full">
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={idx === 0}  // 第一張優先載入
            />
          </div>
        ))}
      </div>
      <h1 className={`absolute text-5xl font-bold text-center 
        top-[45%] left-[50%] translate-[-50%] 
        ${currentSlide == 1 && "text-zinc-300"}
        ${currentSlide == 2 && "text-primary-500"}`}>
        {children}
      </h1>
      {/* Prev／Next 按鈕 */}
      <button
        className="hidden md:block absolute left-[1.5rem] w-10 h-10 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full 
        border-neutral-900 border-2 hover:bg-white/50 cursor-pointer"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <Icon icon='ri:arrow-left-line' className="text-black" width={20} height={20} />
      </button>
      <button
        className="hidden md:block absolute right-[1.5rem] w-10 h-10  top-1/2 transform -translate-y-1/2 p-2 
        bg-white rounded-full border-neutral-900 border-2 hover:bg-white/50 cursor-pointer"
        onClick={() => emblaApi?.scrollNext()}
      >
        <Icon icon='ri:arrow-right-line' className="text-black"  width={20} height={20} />
      </button>

      {/* Dots 分頁點 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
             className={`
              w-3 h-3 rounded-full
              ${currentSlide === idx ? "bg-white" : "bg-white/50 hover:bg-white"}
            `}
            onClick={() => emblaApi?.scrollTo(idx)}
          />
        ))}
      </div>
    </div>
  )
}
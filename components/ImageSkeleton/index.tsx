"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";


/** next image 元件type */
interface Props extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
  skeletonClassName?: string;
}

export default function ImageSkeleton({
  src,
  fallbackSrc = "/fallback.jpg",
   skeletonClassName = "bg-[linear-gradient(90deg,#e0e0e0_25%,#f0f0f0_50%,#e0e0e0_75%)] bg-[length:200%_100%] animate-shimmer",
  className,
  ...rest
}: Props) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className={clsx("relative", rest.fill && "w-full h-full")}>
      {/*圖片載入中*/}
      {!isLoaded && (
        <div
          className={clsx("absolute inset-0 rounded-lg", skeletonClassName)}
        />
      )}
      {/*圖片來源失敗會觸發onError換成預設圖*/}
      <Image
        {...rest}
        quality={100}
        src={imgSrc}
        className={clsx(className, !isLoaded && "invisible")}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgSrc(fallbackSrc)}
        alt={rest.alt}
      />
    </div>
  );
}

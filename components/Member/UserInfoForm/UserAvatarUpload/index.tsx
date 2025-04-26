"use client"
import Image from "next/image";
import { useRef,useState } from "react"
type Props = {
  initialLink?: string;
  onUpload?: (url:string)=>void //上傳api回傳成功的圖片url
};

export default function UserAvatarUpload({ initialLink }: Props) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialLink)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClickUpload():void {
    inputRef?.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // 本機預覽
    const previewURL = URL.createObjectURL(file)
    setAvatarUrl(previewURL)
    // upload avatar api
    
    // upload form 表單資料
  }


  return (
    <div className="avatar_upload">
      <fieldset className="fieldset flex">
        <input type="file" className="file-input hidden" 
        ref={inputRef}
        onChange={handleFileChange}
        />
        <label className="label text-gray-400 text-base self-end order-last">點擊上傳個人圖片</label>
        <div className="avatar">
          <div className="w-24 rounded-full" onClick={handleClickUpload}>
            <Image
              src={avatarUrl || "/header/user_image.jpg"}
              width={35}
              height={35}
              alt="Picture of the author"
              className="cursor-pointer"
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}

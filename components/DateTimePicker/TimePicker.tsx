'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  placeholder?: string;
  error?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = '00:00',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(value ? parseInt(value.split(':')[0]) : 0);
  const [minutes, setMinutes] = useState(value ? parseInt(value.split(':')[1]) : 0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉時間選擇器
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 格式化時間為 HH:MM
  const formatTime = (h: number, m: number): string => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // 更新時間並回調
  const updateTime = (newHours: number, newMinutes: number) => {
    setHours(newHours);
    setMinutes(newMinutes);
    onChange(formatTime(newHours, newMinutes));
  };

  // 增加小時
  const incrementHours = () => {
    const newHours = hours === 23 ? 0 : hours + 1;
    updateTime(newHours, minutes);
  };

  // 減少小時
  const decrementHours = () => {
    const newHours = hours === 0 ? 23 : hours - 1;
    updateTime(newHours, minutes);
  };

  // 增加分鐘（15分鐘間隔）
  const incrementMinutes = () => {
    const minuteOptions = [0, 15, 30, 45];
    const currentIndex = minuteOptions.indexOf(minutes);
    const nextIndex = currentIndex === minuteOptions.length - 1 ? 0 : currentIndex + 1;
    const newMinutes = minuteOptions[nextIndex];
    
    // 如果分鐘回到0，小時也要增加
    if (newMinutes === 0 && minutes === 45) {
      const newHours = hours === 23 ? 0 : hours + 1;
      updateTime(newHours, newMinutes);
    } else {
      updateTime(hours, newMinutes);
    }
  };

  // 減少分鐘（15分鐘間隔）
  const decrementMinutes = () => {
    const minuteOptions = [0, 15, 30, 45];
    const currentIndex = minuteOptions.indexOf(minutes);
    const prevIndex = currentIndex === 0 ? minuteOptions.length - 1 : currentIndex - 1;
    const newMinutes = minuteOptions[prevIndex];
    
    // 如果分鐘從0變為45，小時要減少
    if (newMinutes === 45 && minutes === 0) {
      const newHours = hours === 0 ? 23 : hours - 1;
      updateTime(newHours, newMinutes);
    } else {
      updateTime(hours, newMinutes);
    }
  };

  return (
    <div className="flex flex-col gap-1 flex-1" ref={containerRef}>
      <div className="relative">
        {/* 輸入欄位 */}
        <div
          className={`
            flex items-center justify-between gap-2 px-4 py-3 
            bg-white border rounded-2xl cursor-pointer
            ${error ? 'border-red-500' : isOpen ? 'border-[#5C795F]' : 'border-[#B0B0B0]'}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`text-base ${value ? 'text-black' : 'text-[#B0B0B0]'}`}>
            {value || placeholder}
          </span>
          <Icon icon="ic:outline-access-time" width="20" height="20" />
        </div>

        {/* 時間選擇器彈出框 */}
        {isOpen && (
          <>
            {/* 桌面版時間選擇器彈出框 */}
            <div className="hidden md:block absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-[0px_4px_20px_4px_rgba(0,0,0,0.1)] p-4 z-[9999] w-[144px]">
              <div className="flex items-center justify-center gap-4">
                {/* 小時選擇 */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={incrementHours}
                    className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                  >
                    <Icon icon="ic:outline-arrow-drop-up" width="20" height="20" />
                  </button>
                  
                  <span className="text-base font-normal text-black min-w-[2ch] text-center">
                    {String(hours).padStart(2, '0')}
                  </span>
                  
                  <button
                    type="button"
                    onClick={decrementHours}
                    className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                  >
                   <Icon icon="ic:outline-arrow-drop-down" width="20" height="20" />
                  </button>
                </div>

                {/* 冒號分隔符 */}
                <span className="text-base font-normal text-black">:</span>

                {/* 分鐘選擇 */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={incrementMinutes}
                    className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                  >
                    <Icon icon="ic:outline-arrow-drop-up" width="20" height="20" />
                  </button>
                  
                  <span className="text-base font-normal text-black min-w-[2ch] text-center">
                    {String(minutes).padStart(2, '0')}
                  </span>
                  
                  <button
                    type="button"
                    onClick={decrementMinutes}
                    className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                  >
                    <Icon icon="ic:outline-arrow-drop-down" width="20" height="20" />
                  </button>
                </div>
              </div>
            </div>

            {/* 手機版全螢幕時間選擇器彈出框 */}
            <div className="md:hidden fixed inset-0 z-[9999] flex items-end">
              {/* 背景遮罩 */}
              <div 
                className="absolute inset-0 bg-black/30"
                onClick={() => setIsOpen(false)}
              />
              
              {/* 時間選擇器內容 */}
              <div className="relative w-full bg-white rounded-t-2xl shadow-[0px_4px_20px_4px_rgba(0,0,0,0.1)] px-4 pt-6 pb-4">
                {/* 時間選擇器標題和內容 */}
                <div className="flex flex-col items-center gap-6 mb-6">
                  {/* 時間選擇器內容區域 */}
                  <div className="flex items-center justify-center gap-4">
                    {/* 小時選擇 */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={incrementHours}
                        className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                      >
                        <Icon icon="ic:outline-arrow-drop-up" width="20" height="20" />
                      </button>
                      
                      <span className="text-base font-normal text-black min-w-[2ch] text-center">
                        {String(hours).padStart(2, '0')}
                      </span>
                      
                      <button
                        type="button"
                        onClick={decrementHours}
                        className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                      >
                       <Icon icon="ic:outline-arrow-drop-down" width="20" height="20" />
                      </button>
                    </div>

                    {/* 冒號分隔符 */}
                    <span className="text-base font-normal text-black">:</span>

                    {/* 分鐘選擇 */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={incrementMinutes}
                        className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                      >
                        <Icon icon="ic:outline-arrow-drop-up" width="20" height="20" />
                      </button>
                      
                      <span className="text-base font-normal text-black min-w-[2ch] text-center">
                        {String(minutes).padStart(2, '0')}
                      </span>
                      
                      <button
                        type="button"
                        onClick={decrementMinutes}
                        className="w-8 h-8 border border-[#5C795F] rounded-full flex items-center justify-center p-2"
                      >
                        <Icon icon="ic:outline-arrow-drop-down" width="20" height="20" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 底部按鈕區域 */}
                <div className="flex justify-center gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-6 py-4 border-2 border-[#354738] text-[#354738] rounded-2xl text-base font-semibold hover:bg-gray-50 transition-colors"
                  >
                    返回
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-6 py-4 bg-[#5C795F] text-white rounded-2xl text-base font-semibold hover:bg-[#4a6650] transition-colors"
                  >
                    確認
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default TimePicker;

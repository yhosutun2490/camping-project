'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉日曆
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

  // 格式化日期為 YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 獲取月份名稱
  const getMonthName = (month: number, year: number): string => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[month]} ${year}`;
  };

  // 獲取月份的天數
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 獲取月份第一天是星期幾
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 生成日曆天數
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];

    // 添加空白天數
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 添加月份天數
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // 處理日期選擇
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    onChange(formatDate(newDate));
    setIsOpen(false);
  };

  // 上一個月
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // 下一個月
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // 判斷是否為今天
  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  // 判斷是否為選中日期
  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  // 判斷日期是否可用（不是過去的日期）
  const isAvailable = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 重置時間為午夜
    return date >= today;
  };

  const calendarDays = generateCalendarDays();

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
          <div>
            <Icon icon="majesticons:calendar-line" width="20" height="20" />
          </div>
        </div>

        {/* 日曆彈出框 */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-[0px_4px_20px_4px_rgba(0,0,0,0.1)] p-8 z-50 w-[400px]">
            {/* 日曆標題 */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="w-5 h-5 flex items-center justify-center"
              >
                <Icon icon="ic:outline-arrow-back" width="20" height="20" className='text-[#5C795F]' />
              </button>
              
              <h3 className="text-base font-semibold text-[#354738] text-center">
                {getMonthName(currentMonth.getMonth(), currentMonth.getFullYear())}
              </h3>
              
              <button
                type="button"
                onClick={goToNextMonth}
                className="w-5 h-5 flex items-center justify-center"
              >
                <Icon icon="ic:outline-arrow-forward" width="20" height="20" className='text-[#5C795F]' />
              </button>
            </div>

            {/* 星期標題 */}
            <div className="grid grid-cols-7 gap-0 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayName) => (
                <div key={dayName} className="w-12 h-12 flex items-center justify-center">
                  <span className="text-base font-semibold text-[#B0B0B0]">{dayName}</span>
                </div>
              ))}
            </div>

            {/* 日期網格 */}
            <div className="grid grid-cols-7 gap-0">
              {calendarDays.map((day, index) => (
                <div key={index} className="w-12 h-12 flex items-center justify-center">
                  {day && (
                    <button
                      type="button"
                      disabled={!isAvailable(day)}
                      onClick={() => isAvailable(day) && handleDateSelect(day)}
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-base font-normal
                        ${isSelected(day) 
                          ? 'bg-[#A1B4A2] border border-[#A1B4A2] text-black' 
                          : isToday(day)
                          ? 'border border-[#A1B4A2] text-black'
                          : isAvailable(day)
                          ? 'text-[#3D3D3D] hover:bg-gray-100'
                          : 'text-[#B0B0B0] cursor-not-allowed'
                        }
                      `}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default DatePicker;

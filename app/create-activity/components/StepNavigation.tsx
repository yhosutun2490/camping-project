'use client';
import React from 'react';

interface StepNavigationProps {
  /** 是否顯示返回按鈕 */
  showPrevButton?: boolean;
  /** 是否顯示下一步按鈕 */
  showNextButton?: boolean;
  /** 返回按鈕文字 */
  prevButtonText?: string;
  /** 下一步按鈕文字 */
  nextButtonText?: string;
  /** 返回按鈕點擊事件 */
  onPrevClick?: () => void;
  /** 下一步按鈕點擊事件 */
  onNextClick?: () => void;
  /** 下一步按鈕是否禁用 */
  nextButtonDisabled?: boolean;
  /** 是否顯示載入狀態 */
  isLoading?: boolean;
  /** 載入狀態文字 */
  loadingText?: string;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  showPrevButton = true,
  showNextButton = true,
  prevButtonText = '返回',
  nextButtonText = '繼續填寫，下一步',
  onPrevClick,
  onNextClick,
  nextButtonDisabled = false,
  isLoading = false,
  loadingText = '處理中...',
}) => {
  return (
    <div className="flex flex-row items-center justify-end gap-4 px-6 py-4 bg-white self-stretch">
      {showPrevButton && onPrevClick && (
        <button
          type="button"
          className="flex items-center justify-center gap-1 px-6 py-4 rounded-2xl border-2 border-[#354738] bg-white text-[#354738] hover:bg-[#354738] hover:text-white font-semibold text-base leading-[1.2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onPrevClick}
          disabled={isLoading}
        >
          {prevButtonText}
        </button>
      )}
      {showNextButton && onNextClick && (
        <button
          type="button"
          className="flex items-center justify-center gap-1 px-6 py-4 rounded-2xl bg-[#5C795F] hover:bg-[#4a6651] border-none text-white font-semibold text-base leading-[1.2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            console.log('下一步按鈕被點擊');
            onNextClick();
          }}
          disabled={nextButtonDisabled || isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="ml-2">{loadingText}</span>
            </>
          ) : (
            nextButtonText
          )}
        </button>
      )}
    </div>
  );
};

export default React.memo(StepNavigation);

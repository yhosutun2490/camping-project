'use client';

import React from 'react';

interface EventStepperProps {
  /** 當前步驟 */
  currentStep: number;
  /** 步驟總數 */
  totalSteps: number;
  /** 步驟標題 */
  stepTitles: string[];
  /** 步驟變更事件 */
  onStepChange: (step: number) => void;
  /** 已完成的步驟清單 */
  completedSteps?: number[];
}

function EventStepper({
  currentStep,
  stepTitles,
  onStepChange,
  completedSteps,
}: EventStepperProps) {
  // 已完成步驟清單，預設為當前步驟前的所有步驟
  const completed =
    completedSteps ??
    Array.from({ length: Math.max(0, currentStep - 1) }, (_, i) => i + 1);

  const getStepState = (step: number) => {
    if (completed.includes(step)) return 'done';
    if (step === currentStep) return 'active';
    return 'default';
  };

  const renderStepItem = (title: string, idx: number) => {
    const step = idx + 1;
    const state = getStepState(step);
    const isClickable = state === 'done';
    const isLast = idx === stepTitles.length - 1;

    return (
      <div key={step} className="flex flex-col items-center flex-1">
        {/* 上半部：圓圈和連接線 */}
        <div className="flex items-center w-full">
          {/* 左半連接線（第一個步驟用透明佔位） */}
          <div className="flex-1 h-px">
            {idx > 0 ? (
              <div
                className={`h-full ${
                  getStepState(step - 1) === 'done'
                    ? 'border-t border-[#5C795F]'
                    : 'border-t border-dashed border-[#B0B0B0]'
                }`}
              />
            ) : (
              <div className="h-full" />
            )}
          </div>

          {/* 圓形數字指示器 */}
          <div
            className={`
              w-[29px] h-[29px] rounded-full flex items-center justify-center flex-shrink-0
              ${
                state === 'done' || state === 'active'
                  ? 'bg-[#5C795F] text-white'
                  : 'bg-white text-[#B0B0B0] border border-[#B0B0B0]'
              }
            `}
            onClick={() => {
              if (isClickable) onStepChange(step);
            }}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
          >
            <span className="text-sm font-semibold leading-[1.5]">
              {step}
            </span>
          </div>

          {/* 右半連接線（最後一個步驟用透明佔位） */}
          <div className="flex-1 h-px">
            {!isLast ? (
              <div
                className={`h-full ${
                  state === 'done'
                    ? 'border-t border-[#5C795F]'
                    : 'border-t border-dashed border-[#B0B0B0]'
                }`}
              />
            ) : (
              <div className="h-full" />
            )}
          </div>
        </div>

        {/* 下半部：步驟標題 */}
        <div className="mt-2 text-center">
          <span
            className={`text-sm leading-[1.5] ${
              state === 'done' || state === 'active'
                ? 'text-[#3D3D3D]'
                : 'text-[#B0B0B0]'
            }`}
          >
            {title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl px-4 py-6 bg-white">
      <div className="flex">
        {stepTitles.map((title, idx) => renderStepItem(title, idx))}
      </div>
    </div>
  );
}

export default React.memo(EventStepper);
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

  return (
    <div className="overflow-x-auto">
      <ul className="steps w-full">
        {stepTitles.map((title, idx) => {
          const step = idx + 1;
          const isCompleted = completed.includes(step);
          const isCurrent = step === currentStep;
          const baseClass = 'step';
          const statusClass = isCompleted
            ? ' step-success'
            : isCurrent
            ? ' step-primary'
            : '';
          return (
            <li
              key={step}
              className={baseClass + statusClass}
              onClick={() => {
                if (isCompleted) onStepChange(step);
              }}
              style={{ cursor: isCompleted ? 'pointer' : 'default' }}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default React.memo(EventStepper);

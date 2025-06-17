'use client';
import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import PlanAccordionItem from './PlanAccordionItem';
import { useCreateEventPlans } from '@/swr/events/useCreateEventPlans';
import { CreateEventPlansRequest } from '@/types/api/events';
import toast from 'react-hot-toast';

interface PlanAccordionProps {
  /** 活動 ID（用於 API 呼叫） */
  eventId?: string | null;
}

// 定義 ref 類型
export interface PlanAccordionRef {
  handleSubmit: () => Promise<boolean>;
  getLoadingState: () => boolean;
}

const PlanAccordion = forwardRef<PlanAccordionRef, PlanAccordionProps>(
  ({ eventId }, ref) => {
    // 從 formContext 獲取方法
    const { control, trigger, getValues } = useFormContext<FormData>();

    // 使用 useFieldArray 管理多方案
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'plans',
    });

    // 整合 useCreateEventPlans hook
    // 新版本不需要 eventId 參數
    const { createEventPlans, isCreating } = useCreateEventPlans();

    /**
     * 將表單資料轉換為 API 請求格式
     * @param formPlans 表單中的方案資料
     * @returns API 請求格式的資料
     */
    const convertFormDataToApiFormat = useCallback(
      (formPlans: FormData['plans']): CreateEventPlansRequest => {
        return {
          plans: formPlans.map((plan) => ({
            title: plan.title,
            price: plan.price,
            discounted_price: plan.discountPrice,
            contents: plan.content?.map((item) => item.value) || [],
            addons: plan.addOns || [],
          })),
        };
      },
      []
    );

    // 暴露給父元件的方法
    useImperativeHandle(
      ref,
      () => ({
        handleSubmit: async () => {
          // 先執行 React Hook Form 驗證
          const isValid = await trigger('plans');

          if (isValid) {
            if (eventId) {
              try {
                // 獲取當前表單資料
                const formData = getValues();
                const apiData = convertFormDataToApiFormat(formData.plans);

                // 顯示上傳中提示
                const submitToastId = toast.loading('正在建立方案...');

                // 呼叫建立方案 API
                // 新版本的 createEventPlans 需要兩個參數：payload, eventId
                await createEventPlans(apiData, eventId);

                // 處理建立結果 - 如果沒有拋出錯誤，表示建立成功
                toast.success('方案建立成功', { id: submitToastId });
                return true;
              } catch (error) {
                console.error('建立方案時發生錯誤:', error);
                toast.error('建立方案過程中發生錯誤，請稍後再試');
                return false;
              }
            } else {
              // 如果沒有活動ID，則只是儲存表單資料到狀態
              console.warn('沒有提供活動ID，略過方案建立');
              return true;
            }
          }
          return false;
        },
        getLoadingState: () => isCreating,
      }),
      [
        eventId,
        trigger,
        getValues,
        convertFormDataToApiFormat,
        createEventPlans,
        isCreating,
      ]
    );

    // 控制哪些方案面板是展開的
    const [expandedPlans, setExpandedPlans] = useState<number[]>([0]); // 默認第一個展開

    // 新增方案
    const handleAddPlan = useCallback(() => {
      if (fields.length >= 3) return;

      // 添加新方案，使用適當的默認值
      append({
        title: `方案 ${fields.length + 1}`,
        price: 0,
        discountPrice: undefined,
        content: [],
        addOns: [],
      });

      // 自動展開新添加的方案
      const newIndex = fields.length;
      setExpandedPlans((prev) => [...prev, newIndex]);
    }, [append, fields.length]);

    // 刪除方案
    const handleDeletePlan = useCallback(
      (index: number) => {
        if (fields.length <= 1) return;

        // 添加確認對話框
        if (window.confirm(`確定要刪除方案 ${index + 1} 嗎？`)) {
          remove(index);

          // 更新展開狀態
          setExpandedPlans((prev) =>
            prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
          );
        }
      },
      [fields.length, remove]
    );

    // 切換方案面板展開/收起
    const togglePlan = useCallback((index: number) => {
      setExpandedPlans((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }, []);

    // 控制是否可以添加更多方案
    const canAddMorePlan = fields.length < 3;

    // 控制是否可以刪除方案
    const canDeletePlan = fields.length > 1;

    return (
      <div className="flex flex-col gap-8 self-stretch">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-3xl font-semibold">方案設計</h1>

          {/* 方案數量顯示 */}
          <p className="text-lg font-semibold">
            已建立方案 ({fields.length}/3)
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* 方案列表 */}
          {fields.length === 0 ? (
            <div className="text-center py-8 bg-base-200 rounded-lg">
              <p className="text-base-content/70">尚未建立任何方案</p>
              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={handleAddPlan}
              >
                建立第一個方案
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <PlanAccordionItem
                  key={field.id}
                  index={index}
                  isExpanded={expandedPlans.includes(index)}
                  onToggle={() => togglePlan(index)}
                  onDelete={() => handleDeletePlan(index)}
                  canDelete={canDeletePlan}
                />
              ))}

              {/* 新增方案按鈕（在列表底部） */}
              {canAddMorePlan && (
                <div className="flex justify-center my-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1 px-6 py-4 rounded-2xl bg-[#5C795F] hover:bg-[#4a6651] border-none text-white font-semibold text-base leading-[1.2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAddPlan}
                  >
                    新增方案
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PlanAccordion.displayName = 'PlanAccordion';

export default React.memo(PlanAccordion);

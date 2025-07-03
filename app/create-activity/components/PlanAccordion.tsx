'use client';
import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import PlanAccordionItem from './PlanAccordionItem';
import { useCreateEventPlans } from '@/swr/events/useCreateEventPlans';
import { useUpdateEventPlans } from '@/swr/events/useUpdateEventPlans';
import { useDeleteEventPlan } from '@/swr/events/useDeleteEventPlan';
import { CreateEventPlansRequest, UpdateEventPlansRequest } from '@/types/api/events';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

interface PlanAccordionProps {
  /** 活動 ID（用於 API 呼叫） */
  eventId?: string | null;
}

// 定義 ref 類型
export interface PlanAccordionRef {
  handleSubmit: () => Promise<boolean>;
}

const PlanAccordion = forwardRef<PlanAccordionRef, PlanAccordionProps>(
  ({ eventId }, ref) => {
    // 獲取當前路徑以判斷是建立模式還是編輯模式
    const pathname = usePathname();
    const isEditMode = pathname.includes('/edit-activity');

    // 從 formContext 獲取方法
    const { control, trigger, getValues, getFieldState } = useFormContext<FormData>();

    // 使用 useFieldArray 管理多方案
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'plans',
    });

    // 整合 hooks
    const { createEventPlans } = useCreateEventPlans();
    const { updateEventPlans } = useUpdateEventPlans();
    const { trigger: deleteEventPlan } = useDeleteEventPlan();

    // 控制哪些方案面板是展開的
    const [expandedPlans, setExpandedPlans] = useState<number[]>([0]); // 默認第一個展開

    // ref 用於追蹤最新新增的方案
    const lastPlanRef = useRef<HTMLDivElement>(null);

  // 滾動到錯誤欄位並聚焦
  const scrollToErrorField = useCallback((planIndex: number, fieldName: string) => {
    // 欄位名稱到 DOM 選擇器的對應
    const fieldToSelector: Record<string, string> = {
      title: `input[name="plans.${planIndex}.title"]`,
      price: `input[name="plans.${planIndex}.price"]`,
      discountPrice: `input[name="plans.${planIndex}.discountPrice"]`,
      people_capacity: `input[name="plans.${planIndex}.people_capacity"]`,
      content: `input[name="plans.${planIndex}.content.0.value"]`,
      addOns: `input[name="plans.${planIndex}.addOns.0.name"]`,
    };

    const selector = fieldToSelector[fieldName];
    if (selector) {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        // 先確保該方案面板是展開的
        setExpandedPlans(prev => {
          if (!prev.includes(planIndex)) {
            return [...prev, planIndex];
          }
          return prev;
        });
        
        // 延遲滾動，確保面板展開動畫完成
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // 延遲一下再聚焦，確保滾動完成
          setTimeout(() => {
            if (element.focus) {
              element.focus();
            }
          }, 500);
        }, 300);
      }
    }
  }, [setExpandedPlans]);

    /**
     * 將表單資料轉換為建立 API 請求格式
     * @param formPlans 表單中的方案資料
     * @returns API 請求格式的資料
     */
    const convertFormDataToCreateApiFormat = useCallback(
      (formPlans: FormData['plans']): CreateEventPlansRequest => {
        return {
          plans: formPlans.map((plan) => ({
            title: plan.title,
            price: plan.price,
            discounted_price: plan.discountPrice,
            people_capacity: plan.people_capacity,
            contents: plan.content?.map((item) => item.value) || [],
            addons: plan.addOns || [],
          })),
        };
      },
      []
    );

    /**
     * 將表單資料轉換為更新 API 請求格式
     * @param formPlans 表單中的方案資料
     * @returns API 請求格式的資料
     */
    const convertFormDataToUpdateApiFormat = useCallback(
      (formPlans: FormData['plans']): UpdateEventPlansRequest => {
        return {
          plans: formPlans.map((plan) => ({
            // 在編輯模式下，方案可能有 ID（用於更新）或沒有 ID（用於新增）
            ...(plan.id && { id: plan.id }),
            title: plan.title,
            price: plan.price,
            discounted_price: plan.discountPrice,
            people_capacity: plan.people_capacity,
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

          if (!isValid) {
            const fieldState = getFieldState('plans');
            console.error('方案驗證失敗:', fieldState);
            
            // 收集錯誤訊息，按方案群組化
            const planErrors: Record<number, string[]> = {};
            let firstErrorPlan: number | null = null;
            let firstErrorField: string | null = null;
            
            if (fieldState.error && Array.isArray(fieldState.error)) {
              fieldState.error.forEach((planError, planIndex) => {
                if (planError && typeof planError === 'object') {
                  Object.entries(planError).forEach(([field, error]) => {
                    if (error && typeof error === 'object' && 'message' in error && error.message) {
                      if (!planErrors[planIndex]) planErrors[planIndex] = [];
                      
                      const fieldLabels: Record<string, string> = {
                        title: '方案標題',
                        price: '方案價格',
                        discountPrice: '折扣價格',
                        people_capacity: '方案人數',
                        content: '方案內容',
                        addOns: '加購商品',
                      };
                      
                      const fieldLabel = fieldLabels[field] || field;
                      planErrors[planIndex].push(`  - ${fieldLabel}: ${error.message}`);
                      
                      // 記錄第一個錯誤位置
                      if (firstErrorPlan === null) {
                        firstErrorPlan = planIndex;
                        firstErrorField = field;
                      }
                    }
                    // 處理陣列錯誤（如 content 或 addOns）
                    else if (Array.isArray(error)) {
                      error.forEach((itemError, itemIndex) => {
                        if (itemError && typeof itemError === 'object') {
                          Object.entries(itemError).forEach(([, subError]) => {
                            if (subError && typeof subError === 'object' && 'message' in subError && subError.message) {
                              if (!planErrors[planIndex]) planErrors[planIndex] = [];
                              
                              const fieldLabels: Record<string, string> = {
                                title: '方案標題',
                                price: '方案價格',
                                discountPrice: '折扣價格',
                                people_capacity: '方案人數',
                                content: '方案內容',
                                addOns: '加購商品',
                              };
                              
                              const fieldLabel = fieldLabels[field] || field;
                              planErrors[planIndex].push(`  - ${fieldLabel} (第 ${itemIndex + 1} 項): ${subError.message}`);
                              
                              // 記錄第一個錯誤位置
                              if (firstErrorPlan === null) {
                                firstErrorPlan = planIndex;
                                firstErrorField = field;
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
            
            // 顯示具體錯誤訊息
            if (Object.keys(planErrors).length > 0) {
              // 先關閉所有現有的 toast
              toast.dismiss();
              
              // 建立群組化的錯誤訊息
              const groupedErrorMessages: string[] = [];
              
              Object.entries(planErrors).forEach(([planIndex, errors]) => {
                groupedErrorMessages.push(`• 方案 ${Number(planIndex) + 1}:`);
                groupedErrorMessages.push(...errors);
                groupedErrorMessages.push(''); // 空行分隔
              });
              
              // 移除最後一個空行
              if (groupedErrorMessages[groupedErrorMessages.length - 1] === '') {
                groupedErrorMessages.pop();
              }
              
              const errorText = `請修正以下問題\n${groupedErrorMessages.join('\n')}`;
              
              toast.error(errorText, { 
                duration: 5000,
                style: {
                  whiteSpace: 'pre-line',
                  maxWidth: '700px',
                  textAlign: 'left',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }
              });
              
              // 滾動到第一個錯誤欄位並聚焦
              if (firstErrorPlan !== null && firstErrorField) {
                scrollToErrorField(firstErrorPlan, firstErrorField);
              }
            } else {
              // 先關閉所有現有的 toast
              toast.dismiss();
              toast.error('請檢查方案內容是否正確填寫');
            }
            return false;
          }

          if (eventId) {
            try {
              // 取得表單資料
              const formData = getValues('plans');

              if (isEditMode) {
                // 編輯模式：使用更新 API (PATCH)
                const updatePayload = convertFormDataToUpdateApiFormat(formData);
                
                await updateEventPlans(updatePayload, eventId);
              } else {
                // 建立模式：使用建立 API (POST)
                const createPayload = convertFormDataToCreateApiFormat(formData);
                
                await createEventPlans(createPayload, eventId);
              }

              return true;
            } catch (error) {
              console.error('❌ 方案操作失敗:', error);
              toast.error(isEditMode ? '方案更新過程中發生錯誤，請稍後再試' : '方案建立過程中發生錯誤，請稍後再試');
              return false;
            }
          } else {
            // 如果沒有活動ID，則只是儲存表單資料到狀態
            return true;
          }
        },
      }),
      [
        eventId,
        trigger,
        getValues,
        getFieldState,
        scrollToErrorField,
        isEditMode,
        convertFormDataToCreateApiFormat,
        convertFormDataToUpdateApiFormat,
        createEventPlans,
        updateEventPlans,
      ]
    );

    // 自動捲動到最新新增的方案
    const scrollToNewPlan = useCallback(() => {
      setTimeout(() => {
        if (lastPlanRef.current) {
          lastPlanRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 100); // 等待DOM更新後再捲動
    }, []);

    // 新增方案
    const handleAddPlan = useCallback(() => {
      if (fields.length >= 3) return;

      // 添加新方案，使用適當的默認值
      append({
        title: `方案 ${fields.length + 1}`,
        price: 0,
        discountPrice: 0,
        people_capacity: 1, // 預設為 1 人方案
        content: [{ value: '' }],
        addOns: [],
      });

      // 自動展開新添加的方案
      const newIndex = fields.length;
      setExpandedPlans((prev) => [...prev, newIndex]);
      
      // 新增方案後自動捲動
      scrollToNewPlan();
    }, [append, fields.length, setExpandedPlans, scrollToNewPlan]);

    // 刪除方案
    const handleDeletePlan = useCallback(
      async (index: number) => {
        if (fields.length <= 1) return;

        // 添加確認對話框
        if (window.confirm(`確定要刪除方案 ${index + 1} 嗎？`)) {
          // 從表單值中取得實際的方案資料，而不是從 fields 陣列
          const formValues = getValues('plans');
          const planToDelete = formValues[index];

          console.log('🔍 刪除方案 (從 fields):', fields[index]);
          console.log('🔍 刪除方案 (從表單值):', planToDelete);
          
          // 如果是編輯模式且方案有 ID，則呼叫刪除 API
          if (isEditMode && planToDelete?.id && eventId) {
            try {
              await deleteEventPlan(eventId, planToDelete.id);
              
              // API 呼叫成功後，從表單中移除
              remove(index);
              
              // 更新展開狀態
              setExpandedPlans((prev) =>
                prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
              );
            } catch (error) {
              console.error('❌ 刪除方案失敗:', error);
              // 錯誤已在 useDeleteEventPlan hook 中處理，這裡不需要額外處理
            }
          } else {
            // 建立模式或方案沒有 ID，直接從表單中移除
            remove(index);

            // 更新展開狀態
            setExpandedPlans((prev) =>
              prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
            );
          }
        }
      },
      [fields, isEditMode, eventId, deleteEventPlan, remove, getValues, setExpandedPlans]
    );

    // 切換方案面板展開/收起
    const togglePlan = useCallback((index: number) => {
      setExpandedPlans((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }, [setExpandedPlans]);

    // 控制是否可以添加更多方案
    const canAddMorePlan = fields.length < 3;

    // 控制是否可以刪除方案
    const canDeletePlan = fields.length > 1;

    return (
      <div className="flex flex-col gap-6 self-stretch px-4 py-6 md:px-0 md:py-0">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-semibold text-[#121212]">方案設計</h1>

          {/* 方案數量顯示 */}
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-[#5C795F]">
              已建立方案 ({fields.length}/3)
            </span>
            {fields.length === 3 && (
              <span className="text-sm text-[#AB5F5F] bg-[#FFF5F5] px-2 py-1 rounded-full">
                已達上限
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* 方案列表 */}
          {fields.length === 0 ? (
            <div className="text-center py-12 px-6 bg-gradient-to-br from-[#F5F7F5] to-[#E8F0E8] rounded-2xl border border-[#E0E6E0]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5C795F]/10 flex items-center justify-center">
                <Icon
                  icon="material-symbols:assignment-outline"
                  className="w-8 h-8 text-[#5C795F]"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#121212] mb-2">
                尚未建立任何方案
              </h3>
              <p className="text-[#4F4F4F] mb-6">
                開始建立您的第一個方案，為參與者提供精彩的露營體驗
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#5C795F] hover:bg-[#4a6651] text-white rounded-2xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
                onClick={handleAddPlan}
              >
                <Icon icon="material-symbols:add" className="text-lg" />
                建立第一個方案
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  ref={index === fields.length - 1 ? lastPlanRef : null} // 將ref指向最後一個方案
                >
                  <PlanAccordionItem
                    index={index}
                    isExpanded={expandedPlans.includes(index)}
                    onToggle={() => togglePlan(index)}
                    onDelete={() => handleDeletePlan(index)}
                    canDelete={canDeletePlan}
                  />
                </div>
              ))}

              {/* 新增方案按鈕（在列表底部） */}
              {canAddMorePlan && (
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-dashed border-[#5C795F] bg-white hover:bg-[#5C795F] text-[#5C795F] hover:text-white font-semibold text-base transition-all duration-200 hover:scale-105"
                    onClick={handleAddPlan}
                  >
                    <Icon icon="material-symbols:add" className="w-5 h-5" />
                    新增方案 ({fields.length}/3)
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

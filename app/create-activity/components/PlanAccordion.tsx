'use client';
import React, { useState, useCallback } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import PlanAccordionItem from './PlanAccordionItem';

interface PlanAccordionProps {
  /** 返回上一部 */
  onPrevStep: () => void;
  /** 提交表單 */
  onSubmit: () => void;
}

function PlanAccordion({ onPrevStep, onSubmit }: PlanAccordionProps) {
  // 從 formContext 獲取方法
  const {
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();

  // 使用 useFieldArray 管理多方案
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'plans',
  });

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
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  // 檢查表單提交前的驗證
  const handleSubmit = async () => {
    const isValid = await trigger('plans');
    if (isValid) {
      onSubmit();
    } else {
      // 自動展開有錯誤的方案
      const plansWithErrors = Object.keys(errors.plans || {})
        .map((key) => parseInt(key))
        .filter((index) => !isNaN(index));

      if (plansWithErrors.length > 0) {
        setExpandedPlans((prev) => [...new Set([...prev, ...plansWithErrors])]);
      }
    }
  };

  // 控制是否可以添加更多方案
  const canAddMorePlan = fields.length < 3;

  // 控制是否可以刪除方案
  const canDeletePlan = fields.length > 1;

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">方案設計</h2>

      <div className="space-y-8">
        {/* 方案數量顯示 */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            已建立方案 ({fields.length}/3)
          </h3>
          {canAddMorePlan && (
            <button
              type="button"
              className="btn btn-sm btn-outline btn-primary"
              onClick={handleAddPlan}
            >
              新增方案
            </button>
          )}
        </div>

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
                  className="btn btn-outline btn-primary"
                  onClick={handleAddPlan}
                >
                  新增方案
                </button>
              </div>
            )}
          </div>
        )}

        {/* 按鈕區 */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onPrevStep}
          >
            返回上一步
          </button>
          <button
            type="button"
            className="btn btn-primary px-8"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '提交中...' : '提交'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PlanAccordion);

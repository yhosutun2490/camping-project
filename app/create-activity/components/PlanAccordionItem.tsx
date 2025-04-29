'use client';
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FormField from '../../../components/form/FormField';
import FormInput from '../../../components/form/FormInput';
import FormNumberInput from '../../../components/form/FormNumberInput';

interface PlanAccordionItemProps {
  /** 方案索引 */
  index: number;
  /** 是否展開 */
  isExpanded: boolean;
  /** 切換展開狀態 */
  onToggle: () => void;
  /** 刪除方案 */
  onDelete: () => void;
  /** 是否可以刪除 */
  canDelete: boolean;
}

function PlanAccordionItem({
  index,
  isExpanded,
  onToggle,
  onDelete,
  canDelete,
}: PlanAccordionItemProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  // 監聽方案標題，用於顯示在摺疊面板標題上
  const planTitle = watch(`plans.${index}.title`) || `方案 ${index + 1}`;

  // 設置方案內容的 useFieldArray
  const contentArray = useFieldArray({
    control,
    name: `plans.${index}.content`,
  });

  // 設置加購商品的 useFieldArray
  const addOnsArray = useFieldArray({
    control,
    name: `plans.${index}.addOns`,
  });

  // 方案錯誤訊息
  const planErrors = errors.plans?.[index];

  // 添加內容項
  const handleAddContent = () => {
    contentArray.append({ value: '' });
  };

  // 添加加購商品
  const handleAddAddOn = () => {
    addOnsArray.append({ name: '', price: 0 });
  };

  return (
    <div
      className={`collapse ${
        isExpanded ? 'collapse-open' : 'collapse-close'
      } bg-base-200 rounded-lg`}
    >
      <div
        className="collapse-title text-xl font-medium flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div>
          方案 {index + 1}:
          <span className="ml-2 font-normal text-base">{planTitle}</span>
        </div>
        <div className="flex items-center">
          {planErrors && (
            <span className="text-error text-sm mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isExpanded ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
            />
          </svg>
        </div>
      </div>
      <div className="collapse-content">
        <div className="p-4 space-y-6">
          {/* 方案基本資訊 */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">方案基本資訊</h3>

              <div className="space-y-4">
                {/* 方案標題 */}
                <FormField
                  label="方案標題"
                  name={`plans.${index}.title`}
                  required
                  error={planErrors?.title?.message}
                >
                  <FormInput
                    name={`plans.${index}.title`}
                    placeholder="請輸入方案標題（最多100字）"
                  />
                </FormField>

                {/* 方案價格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="方案價格"
                    name={`plans.${index}.price`}
                    required
                    error={planErrors?.price?.message}
                  >
                    <FormNumberInput
                      name={`plans.${index}.price`}
                      min={0}
                      step={1}
                    />
                  </FormField>

                  {/* 折扣價格 */}
                  <FormField
                    label="折扣價格（可選）"
                    name={`plans.${index}.discountPrice`}
                    error={planErrors?.discountPrice?.message}
                  >
                    <FormNumberInput
                      name={`plans.${index}.discountPrice`}
                      min={0}
                      step={1}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          </div>

          {/* 方案內容 */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">方案內容</h3>

              <FormField
                label="內容項目"
                name={`plans.${index}.content`}
                required
                error={planErrors?.content?.message}
              >
                <div className="space-y-2">
                  {contentArray.fields.map((field, contentIndex) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormInput
                        name={`plans.${index}.content.${contentIndex}.value`}
                        placeholder="請輸入內容項目"
                      />
                      <button
                        type="button"
                        className="btn btn-square btn-sm btn-outline btn-error"
                        onClick={() => contentArray.remove(contentIndex)}
                        disabled={contentArray.fields.length <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary w-full"
                    onClick={handleAddContent}
                  >
                    + 新增內容項目
                  </button>
                </div>
              </FormField>
            </div>
          </div>

          {/* 加購商品 */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">加購商品（可選）</h3>

              <FormField
                label="加購商品"
                name={`plans.${index}.addOns`}
                error={planErrors?.addOns?.message}
              >
                <div className="space-y-4">
                  {addOnsArray.fields.length === 0 ? (
                    <div className="text-center py-4 bg-base-200 rounded-lg text-base-content/70">
                      尚未添加加購商品
                    </div>
                  ) : (
                    addOnsArray.fields.map((field, addOnIndex) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center p-2 border rounded-md"
                      >
                        <div className="md:col-span-2">
                          <FormInput
                            name={`plans.${index}.addOns.${addOnIndex}.name`}
                            placeholder="商品名稱"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <FormNumberInput
                            name={`plans.${index}.addOns.${addOnIndex}.price`}
                            min={0}
                            step={1}
                          />
                          <button
                            type="button"
                            className="btn btn-square btn-sm btn-outline btn-error"
                            onClick={() => addOnsArray.remove(addOnIndex)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}

                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary w-full"
                    onClick={handleAddAddOn}
                  >
                    + 新增加購商品
                  </button>
                </div>
              </FormField>
            </div>
          </div>

          {/* 方案操作按鈕 */}
          <div className="flex justify-end mt-4">
            {canDelete && (
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={onDelete}
              >
                刪除方案
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PlanAccordionItem);

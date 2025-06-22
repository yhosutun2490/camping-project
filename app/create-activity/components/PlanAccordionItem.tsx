'use client';
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FormField from '../../../components/form/FormField';
import FormInput from '../../../components/form/FormInput';
import FormNumberInput from '../../../components/form/FormNumberInput';
import { Icon } from '@iconify/react';

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
    addOnsArray.append({ name: '', price: 1 });
  };

  return (
    <div className="border border-[#E0E6E0] rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div
        className="flex justify-between items-center p-4 md:p-6 cursor-pointer hover:bg-gradient-to-r hover:from-[#F5F7F5] hover:to-transparent transition-all duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5C795F] flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>
            <span className="text-base font-semibold text-[#121212] hidden md:inline">
              方案 {index + 1}:
            </span>
          </div>
          <span className="text-sm md:text-base text-[#4F4F4F] truncate flex-1 min-w-0">
            {planTitle}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-3">
          {planErrors && (
            <Icon 
              icon="material-symbols:error" 
              className="w-5 h-5 text-[#AB5F5F] animate-pulse" 
            />
          )}
          <Icon 
            icon="material-symbols:keyboard-arrow-down" 
            className={`w-5 h-5 text-[#5C795F] transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-[#E0E6E0] bg-gradient-to-b from-white to-[#FAFBFA]">
          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-8">
              {/* 方案基本資訊 */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-[#5C795F] rounded-full"></div>
                    <h3 className="text-lg font-semibold text-[#121212]">方案基本資訊</h3>
                  </div>
                  {/* 方案操作按鈕 */}
                  {canDelete && (
                    <button
                      type="button"
                      className="w-full md:w-auto px-6 py-3 rounded-2xl border-2 border-[#AB5F5F] bg-white text-[#AB5F5F] hover:bg-[#AB5F5F] hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
                      onClick={onDelete}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Icon icon="material-symbols:delete-outline" className="w-4 h-4" />
                        刪除方案
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-4">
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

                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                    {/* 方案價格 */}
                    <div className="flex-1">
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
                    </div>

                    {/* 折扣價格 */}
                    <div className="flex-1">
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-[#5C795F] rounded-full"></div>
                  <h3 className="text-lg font-semibold text-[#121212]">方案內容</h3>
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#5C795F] hover:bg-[#4a6651] text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
                  onClick={handleAddContent}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="material-symbols:add" className="w-4 h-4" />
                    新增方案內容
                  </span>
                </button>
              </div>
              <FormField
                label="內容項目"
                name={`plans.${index}.content`}
                required
                error={planErrors?.content?.message}
              >
                <div className="flex flex-col gap-4">
                  {contentArray.fields.length === 0 ? (
                    <div className="text-center py-8 bg-gradient-to-br from-[#F5F7F5] to-[#E8F0E8] rounded-xl border border-dashed border-[#5C795F]/30">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#5C795F]/10 flex items-center justify-center">
                        <Icon icon="material-symbols:description-outline" className="w-6 h-6 text-[#5C795F]" />
                      </div>
                      <p className="text-[#4F4F4F] text-sm">尚未新增方案內容</p>
                    </div>
                  ) : (
                    contentArray.fields.map((field, contentIndex) => {
                      const contentError = planErrors?.content?.[contentIndex]?.value?.message;
                      return (
                        <div key={field.id} className="flex gap-3 items-start">
                          <div className="flex-1">
                            <FormInput
                              name={`plans.${index}.content.${contentIndex}.value`}
                              placeholder="請輸入內容項目"
                            />
                            {contentError && (
                              <span className="text-xs font-normal text-[#AB5F5F] leading-[1.5em] font-[Noto_Sans_TC] mt-1 block">
                                {contentError}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-[#AB5F5F] text-[#AB5F5F] hover:bg-[#AB5F5F] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                            onClick={() => contentArray.remove(contentIndex)}
                            disabled={contentArray.fields.length <= 1}
                          >
                            <Icon icon="material-symbols:delete-outline" className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </FormField>
            </div>

            {/* 加購商品 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-[#5C795F] rounded-full"></div>
                  <h3 className="text-lg font-semibold text-[#121212]">加購商品（可選）</h3>
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#5C795F] hover:bg-[#4a6651] text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
                  onClick={handleAddAddOn}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="material-symbols:add" className="w-4 h-4" />
                    新增加購商品
                  </span>
                </button>
              </div>

              <FormField
                label="加購商品"
                name={`plans.${index}.addOns`}
                error={planErrors?.addOns?.message}
              >
                <div className="flex flex-col gap-4">
                  {addOnsArray.fields.length === 0 ? (
                    <div className="text-center py-8 bg-gradient-to-br from-[#F5F7F5] to-[#E8F0E8] rounded-xl border border-dashed border-[#5C795F]/30">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#5C795F]/10 flex items-center justify-center">
                        <Icon icon="material-symbols:shopping-bag-outline" className="w-6 h-6 text-[#5C795F]" />
                      </div>
                      <p className="text-[#4F4F4F] text-sm">尚未新增加購商品</p>
                    </div>
                  ) : (
                    addOnsArray.fields.map((field, addOnIndex) => (
                      <div
                        key={field.id}
                        className="flex flex-col gap-4 lg:flex-row lg:items-end p-4 bg-white rounded-xl border border-[#E0E6E0]"
                      >
                        <div className="flex-1">
                          <FormField
                            label="商品名稱"
                            name={`plans.${index}.addOns.${addOnIndex}.name`}
                            required
                            error={planErrors?.addOns?.[addOnIndex]?.name?.message}
                          >
                            <FormInput
                              name={`plans.${index}.addOns.${addOnIndex}.name`}
                              placeholder="商品名稱"
                            />
                          </FormField>
                        </div>
                        <div className="flex gap-3 items-end">
                          <div className="w-32">
                            <FormField
                              label="商品價格"
                              name={`plans.${index}.addOns.${addOnIndex}.price`}
                              required
                              error={planErrors?.addOns?.[addOnIndex]?.price?.message}
                            >
                              <FormNumberInput
                                name={`plans.${index}.addOns.${addOnIndex}.price`}
                                min={1}
                                step={1}
                                placeholder="商品價格"
                              />
                            </FormField>
                          </div>
                          <button
                            type="button"
                            className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-[#AB5F5F] text-[#AB5F5F] hover:bg-[#AB5F5F] hover:text-white transition-all duration-200 hover:scale-105"
                            onClick={() => addOnsArray.remove(addOnIndex)}
                          >
                            <Icon icon="material-symbols:delete-outline" className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </FormField>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(PlanAccordionItem);

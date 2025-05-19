'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FormField from '../../../components/form/FormField';
import FormInput from '../../../components/form/FormInput';
import FormNumberInput from '../../../components/form/FormNumberInput';
import FormSwitch from '../../../components/form/FormSwitch';
import FormDynamicInputs from '../../../components/form/FormDynamicInputs';

interface EventInfoFormProps {
  /** 下一步 */
  onNextStep: () => void;
  /** 返回上一步 */
  onPrevStep?: () => void;
}

function EventInfoForm({ onNextStep, onPrevStep }: EventInfoFormProps) {
  const {
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();

  // 產生小時選項：00-23
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  // 產生分鐘選項：00, 15, 30, 45
  const minutes = ['00', '15', '30', '45'];

  // 處理下一步按鈕點擊
  const handleNextStep = async () => {
    // 先觸發表單驗證，僅驗證 eventInfo 欄位
    const isValid = await trigger('eventInfo');

    // 印出當前表單狀態與驗證結果
    console.log('繼續填寫按鈕點擊，表單狀態:', {
      表單資料: getValues(),
      驗證結果: isValid,
      錯誤訊息: errors,
    });

    // 如果驗證通過，才進行下一步
    if (isValid) {
      onNextStep();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">活動基本資訊</h2>

      <div className="space-y-8">
        {/* 基本資訊區塊 */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">基本資訊</h3>

            <div className="space-y-4">
              {/* 活動主題 */}
              <FormField
                label="活動主題"
                name="eventInfo.title"
                required
                error={errors.eventInfo?.title?.message}
              >
                <FormInput
                  name="eventInfo.title"
                  placeholder="請輸入活動主題（最多100字）"
                />
              </FormField>

              {/* 主辦方名稱 */}
              <FormField
                label="主辦方名稱"
                name="eventInfo.organizer"
                required
                error={errors.eventInfo?.organizer?.message}
              >
                <FormInput
                  name="eventInfo.organizer"
                  placeholder="請輸入主辦方名稱（最多50字）"
                />
              </FormField>

              {/* 活動地點 */}
              <FormField
                label="活動地點"
                name="eventInfo.address"
                required
                error={errors.eventInfo?.address?.message}
              >
                <FormInput
                  name="eventInfo.address"
                  placeholder="請輸入活動地點（最多200字）"
                />
              </FormField>

              {/* 經度座標 */}
              <FormField
                label="經度"
                name="eventInfo.longitude"
                required
                error={errors.eventInfo?.longitude?.message}
              >
                <FormNumberInput
                  name="eventInfo.longitude"
                  step={0.000001}
                />
              </FormField>

              {/* 緯度座標 */}
              <FormField
                label="緯度"
                name="eventInfo.latitude"
                required
                error={errors.eventInfo?.latitude?.message}
              >
                <FormNumberInput
                  name="eventInfo.latitude"
                  step={0.000001}
                />
              </FormField>

              {/* 上限人數 */}
              <FormField
                label="上限人數"
                name="eventInfo.max_participants"
                required
                error={errors.eventInfo?.max_participants?.message}
              >
                <FormNumberInput
                  name="eventInfo.max_participants"
                  min={1}
                  max={10000}
                  step={1}
                />
              </FormField>
              
              {/* 活動價格 */}
              <FormField
                label="活動價格"
                name="eventInfo.price"
                required
                error={errors.eventInfo?.price?.message}
              >
                <FormNumberInput
                  name="eventInfo.price"
                  min={0}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* 活動時間區塊 */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">活動時間</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="開始日期"
                name="eventInfo.startDate"
                required
                error={errors.eventInfo?.startDate?.message}
              >
                <input
                  type="date"
                  className="input input-bordered w-full"
                  {...register('eventInfo.startDate')}
                />
              </FormField>

              <FormField
                label="開始時間"
                name="eventInfo.startTime"
                required
                error={errors.eventInfo?.startTime?.message}
              >
                <div className="flex gap-2">
                  <select
                    className="select select-bordered flex-1"
                    onChange={(e) => {
                      const hour = e.target.value.split(':')[0];
                      const minute =
                        getValues('eventInfo.startTime').split(':')[1] || '00';
                      setValue('eventInfo.startTime', `${hour}:${minute}`);
                      trigger('eventInfo.startTime');
                    }}
                    defaultValue={
                      getValues('eventInfo.startTime').split(':')[0] + ':00' ||
                      '00:00'
                    }
                  >
                    {hours.map((hour) => (
                      <option key={`start-h-${hour}`} value={`${hour}:00`}>
                        {hour} 時
                      </option>
                    ))}
                  </select>
                  <span className="self-center">:</span>
                  <select
                    className="select select-bordered flex-1"
                    onChange={(e) => {
                      const minute = e.target.value.split(':')[1];
                      const hour =
                        getValues('eventInfo.startTime').split(':')[0] || '00';
                      setValue('eventInfo.startTime', `${hour}:${minute}`);
                      trigger('eventInfo.startTime');
                    }}
                    defaultValue={
                      '00:' +
                      (getValues('eventInfo.startTime').split(':')[1] || '00')
                    }
                  >
                    {minutes.map((minute) => (
                      <option key={`start-m-${minute}`} value={`00:${minute}`}>
                        {minute} 分
                      </option>
                    ))}
                  </select>
                </div>
              </FormField>

              <FormField
                label="結束日期"
                name="eventInfo.endDate"
                required
                error={errors.eventInfo?.endDate?.message}
              >
                <input
                  type="date"
                  className="input input-bordered w-full"
                  {...register('eventInfo.endDate')}
                />
              </FormField>

              <FormField
                label="結束時間"
                name="eventInfo.endTime"
                required
                error={errors.eventInfo?.endTime?.message}
              >
                <div className="flex gap-2">
                  <select
                    className="select select-bordered flex-1"
                    onChange={(e) => {
                      const hour = e.target.value.split(':')[0];
                      const minute =
                        getValues('eventInfo.endTime').split(':')[1] || '00';
                      setValue('eventInfo.endTime', `${hour}:${minute}`);
                      trigger('eventInfo.endTime');
                    }}
                    defaultValue={
                      getValues('eventInfo.endTime').split(':')[0] + ':00' ||
                      '00:00'
                    }
                  >
                    {hours.map((hour) => (
                      <option key={`end-h-${hour}`} value={`${hour}:00`}>
                        {hour} 時
                      </option>
                    ))}
                  </select>
                  <span className="self-center">:</span>
                  <select
                    className="select select-bordered flex-1"
                    onChange={(e) => {
                      const minute = e.target.value.split(':')[1];
                      const hour =
                        getValues('eventInfo.endTime').split(':')[0] || '00';
                      setValue('eventInfo.endTime', `${hour}:${minute}`);
                      trigger('eventInfo.endTime');
                    }}
                    defaultValue={
                      '00:' +
                      (getValues('eventInfo.endTime').split(':')[1] || '00')
                    }
                  >
                    {minutes.map((minute) => (
                      <option key={`end-m-${minute}`} value={`00:${minute}`}>
                        {minute} 分
                      </option>
                    ))}
                  </select>
                </div>
              </FormField>
              
              <FormField
                label="報名開始時間"
                name="eventInfo.registration_open_time"
                required
                error={errors.eventInfo?.registration_open_time?.message}
              >
                <input
                  type="datetime-local"
                  className="input input-bordered w-full"
                  {...register('eventInfo.registration_open_time')}
                />
              </FormField>
              
              <FormField
                label="報名截止時間"
                name="eventInfo.registration_close_time"
                required
                error={errors.eventInfo?.registration_close_time?.message}
              >
                <input
                  type="datetime-local"
                  className="input input-bordered w-full"
                  {...register('eventInfo.registration_close_time')}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* 活動詳情區塊 */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">活動詳情</h3>

            {/* 活動描述 */}
            <FormField
              label="活動描述"
              name="eventInfo.description"
              required
              error={errors.eventInfo?.description?.message}
            >
              <textarea
                className="textarea textarea-bordered w-full"
                rows={5}
                placeholder="請描述您的活動內容（最多5000字）"
                {...register('eventInfo.description')}
              />
            </FormField>

            {/* 活動標籤 */}
            <FormField
              label="活動標籤"
              name="eventInfo.tags"
              required
              error={errors.eventInfo?.tags?.message}
            >
              <div className="bg-base-100 p-3 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 1, label: '寵物友善' },
                    { id: 2, label: '閤家同樂' },
                    { id: 3, label: '新手友善' },
                    { id: 4, label: '進階挑戰' },
                    { id: 5, label: '秘境探索' },
                    { id: 6, label: '奢豪露營' },
                  ].map((tag) => (
                    <label key={tag.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        value={tag.id}
                        checked={(getValues('eventInfo.tags') || []).includes(tag.id)}
                        onChange={(e) => {
                          const currentTags = getValues('eventInfo.tags') || [];
                          const tagId = Number(e.target.value);
                          
                          if (e.target.checked) {
                            // 新增標籤ID到陣列
                            setValue('eventInfo.tags', [...currentTags, tagId]);
                          } else {
                            // 從陣列中移除標籤ID
                            setValue(
                              'eventInfo.tags',
                              currentTags.filter((id) => id !== tagId)
                            );
                          }
                          
                          trigger('eventInfo.tags');
                        }}
                      />
                      <span>{tag.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </FormField>
          </div>
        </div>

        {/* 其他選項區塊 */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">其他選項</h3>

            {/* 取消政策 */}
            <FormField
              label="取消政策"
              name="eventInfo.cancel_policy"
              error={errors.eventInfo?.cancel_policy?.message}
            >
              <div className="bg-base-100 p-3 rounded-lg">
                <FormSwitch
                  name="eventInfo.cancel_policy"
                  label="15 天前可免費取消"
                />
              </div>
            </FormField>

            {/* 行前通知 */}
            <FormField
              label="行前通知（選填）"
              name="eventInfo.event_notifications"
              error={errors.eventInfo?.event_notifications?.message}
            >
              <div className="bg-base-100 p-3 rounded-lg">
                <FormDynamicInputs
                  addButtonLabel="新增通知"
                  placeholder="輸入行前通知內容（至少5個字）"
                />
              </div>
            </FormField>
          </div>
        </div>

        {/* 按鈕區 */}
        <div className="flex justify-between pt-4">
          {onPrevStep && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={onPrevStep}
            >
              返回
            </button>
          )}
          <div className={onPrevStep ? '' : 'ml-auto'}>
            <button
              type="button"
              className="btn btn-primary px-8"
              onClick={handleNextStep}
            >
              繼續填寫，下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(EventInfoForm);

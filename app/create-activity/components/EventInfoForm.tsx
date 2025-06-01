'use client';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FormField from '../../../components/form/FormField';
import FormInput from '../../../components/form/FormInput';
import FormNumberInput from '../../../components/form/FormNumberInput';
import FormSwitch from '../../../components/form/FormSwitch';
import FormDynamicInputs from '../../../components/form/FormDynamicInputs';
import { useEventTags } from '@/swr/meta/useEventTags';
import { useCreateEvent } from '@/swr/events/useCreateEvent';
import { useUpdateEventNoticesTags } from '@/swr/events/useUpdateEventNoticesTags';
import {
  CreateEventRequest,
  UpdateEventNoticesTagsRequest,
  EventNotice,
} from '@/types/api/events';
import toast from 'react-hot-toast';

interface EventInfoFormProps {
  /** 下一步 */
  onNextStep: () => void;
  /** 返回上一步 */
  onPrevStep?: () => void;
  /** 活動建立後的回調函式，提供活動 ID */
  onEventCreated?: (id: string) => void;
}

function EventInfoForm({ onNextStep, onPrevStep, onEventCreated }: EventInfoFormProps) {
  // 使用 useEventTags 取得活動標籤
  const {
    data: eventTagsResponse,
    error: eventTagsError,
    isLoading: eventTagsLoading,
  } = useEventTags();

  // API 操作狀態管理
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 初始化 API Hooks
  const { trigger: triggerCreateEvent, isMutating: isCreating } =
    useCreateEvent();
  const { trigger: triggerUpdateEventNoticesTags, isMutating: isUpdating } =
    useUpdateEventNoticesTags();

  // 如果標籤載入錯誤，直接在渲染時顯示錯誤訊息
  if (eventTagsError && !eventTagsLoading) {
    toast.error('無法載入活動標籤，請稍後再試', { id: 'event-tags-error' });
  }

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

  // 處理表單資料轉換為 API 請求格式
  const prepareCreateEventData = (
    formData: FormData['eventInfo']
  ): CreateEventRequest => {
    // 組合日期和時間為完整ISO格式
    const startDateTime = `${formData.startDate}T${formData.startTime}:00`;
    const endDateTime = `${formData.endDate}T${formData.endTime}:00`;

    return {
      title: formData.title,
      address: formData.address,
      description: formData.description,
      start_time: startDateTime,
      end_time: endDateTime,
      max_participants: formData.max_participants,
      cancel_policy: formData.cancel_policy ? '15 天前可免費取消' : '不可取消',
      registration_open_time: formData.registration_open_time,
      registration_close_time: formData.registration_close_time,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };
  };

  // 處理標籤和通知資料轉換為 API 請求格式
  const prepareUpdateNoticesTagsData = (
    formData: FormData['eventInfo']
  ): UpdateEventNoticesTagsRequest => {
    // 標籤ID已經是字串，直接使用
    const tagIds = formData.tags;

    // 處理通知資料
    const notices: EventNotice[] = Array.isArray(formData.event_notifications)
      ? formData.event_notifications.map((content) => ({
          type: 'event', // 固定類型為 event
          content,
        }))
      : [];

    return {
      tagIds,
      notices,
    };
  };

  // 處理下一步按鈕點擊
  const handleNextStep = async () => {
    // 先觸發表單驗證，僅驗證 eventInfo 欄位
    const isValid = await trigger('eventInfo');

    if (!isValid) {
      return;
    }

    try {
      // 開始提交，設定載入狀態
      setIsSubmitting(true);

      const eventInfo = getValues('eventInfo');

      // 步驟1: 建立活動
      const createEventData = prepareCreateEventData(eventInfo);
      const createResult = await triggerCreateEvent(createEventData);

      if (!createResult?.data?.event?.id) {
        throw new Error('活動建立失敗，未返回活動ID');
      }

      // 取得活動ID，並設定為目前ID
      const eventId = createResult.data.event.id;
      
      // 通知父元件活動已建立並傳遞 ID
      if (onEventCreated) {
        onEventCreated(eventId);
      }

      // 步驟2: 準備更新資料
      const updateData = prepareUpdateNoticesTagsData(eventInfo);

      // 這裡我們觸發更新操作，同時傳入最新的 eventId
      const updateResult = await triggerUpdateEventNoticesTags(
        updateData,
        eventId
      );

      // 如果更新成功，進入下一步
      if (updateResult) {
        onNextStep();
      }
    } catch (error) {
      console.error('表單提交錯誤:', error);
      setIsSubmitting(false);
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
                <FormNumberInput name="eventInfo.longitude" step={0.000001} />
              </FormField>

              {/* 緯度座標 */}
              <FormField
                label="緯度"
                name="eventInfo.latitude"
                required
                error={errors.eventInfo?.latitude?.message}
              >
                <FormNumberInput name="eventInfo.latitude" step={0.000001} />
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
                <FormNumberInput name="eventInfo.price" min={0} />
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
                  {eventTagsLoading ? (
                    <div className="w-full flex justify-center py-2">
                      <span className="loading loading-spinner loading-md"></span>
                      <span className="ml-2">載入標籤中...</span>
                    </div>
                  ) : eventTagsError ? (
                    <div className="w-full text-error text-center py-2">
                      無法載入標籤，請重新整理頁面
                    </div>
                  ) : (
                    eventTagsResponse?.data?.eventTags.map((tag) => (
                      <label
                        key={tag.id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          value={tag.id}
                          checked={(getValues('eventInfo.tags') || []).includes(
                            tag.id
                          )}
                          onChange={(e) => {
                            const currentTags =
                              getValues('eventInfo.tags') || [];
                            const tagId = e.target.value; // 直接使用字串值

                            if (e.target.checked) {
                              // 新增標籤ID到陣列
                              setValue('eventInfo.tags', [
                                ...currentTags,
                                tagId,
                              ]);
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
                        <span>{tag.name}</span>
                      </label>
                    ))
                  )}
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
              disabled={
                isSubmitting || eventTagsLoading || isCreating || isUpdating
              }
            >
              {isSubmitting || isCreating || isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="ml-2">處理中...</span>
                </>
              ) : (
                '繼續填寫，下一步'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(EventInfoForm);

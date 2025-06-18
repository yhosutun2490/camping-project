'use client';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FormField from '../../../components/form/FormField';
import FormInput from '../../../components/form/FormInput';
import FormCheckboxGroup from '../../../components/form/FormCheckboxGroup';
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
import DatePicker from '@/components/DateTimePicker/DatePicker';
import TimePicker from '@/components/DateTimePicker/TimePicker';
import FormNumberInput from '@/components/form/FormNumberInput';

interface EventInfoFormProps {
  /** 活動建立後的回調函式，提供活動 ID */
  onEventCreated?: (id: string) => void;
}

export interface EventInfoFormRef {
  handleSubmit: () => Promise<boolean>;
  getLoadingState: () => { isLoading: boolean; loadingText: string };
}

const EventInfoForm = forwardRef<EventInfoFormRef, EventInfoFormProps>(
  ({ onEventCreated }, ref) => {
    // 使用 useEventTags 取得活動標籤
    const {
      data: eventTagsData,
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

    // 使用 useImperativeHandle 暴露方法給父元件
    useImperativeHandle(ref, () => ({
      handleSubmit: handleNextStep,
      getLoadingState: () => {
        let loadingText = '';
        if (isSubmitting || isCreating) {
          loadingText = '建立活動中...';
        } else if (isUpdating) {
          loadingText = '更新標籤與通知中...';
        }

        return {
          isLoading: isSubmitting || isCreating || isUpdating,
          loadingText,
        };
      },
    }));

    // 將 API 回傳的標籤資料轉換為 FormCheckboxGroup 所需的格式
    const tagOptions =
      eventTagsData?.data?.eventTags?.map((tag) => ({
        value: tag.id, // 使用 tag.id 作為 value
        label: tag.name, // 使用 tag.name 作為 label
      })) || [];

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

    // 處理表單資料轉換為 API 請求格式
    const prepareCreateEventData = (
      formData: FormData['eventInfo']
    ): CreateEventRequest => {
      // 組合日期和時間為完整ISO格式
      const startDateTime = `${formData.startDate}T${formData.startTime}:00`;
      const endDateTime = `${formData.endDate}T${formData.endTime}:00`;

      // 如果沒有設定報名時間，使用合理的預設值
      const registrationOpenTime = `${formData.registration_startDate}T${formData.registration_startTime}:00`;

      const registrationCloseTime = `${formData.registration_endDate}T${formData.registration_endTime}:00`;

      return {
        title: formData.title,
        address: formData.address,
        description: formData.description,
        start_time: startDateTime,
        end_time: endDateTime,
        max_participants: formData.max_participants,
        cancel_policy: formData.cancel_policy
          ? '15 天前可免費取消'
          : '不可取消',
        registration_open_time: registrationOpenTime,
        registration_close_time: registrationCloseTime,
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
    const handleNextStep = async (): Promise<boolean> => {
      // 先觸發表單驗證，僅驗證 eventInfo 欄位
      const isValid = await trigger('eventInfo');

      console.log('表單驗證結果:', isValid);
      console.log('表單錯誤:', errors);
      console.log('表單資料:', getValues('eventInfo'));

      if (!isValid) {
        toast.error('請檢查表單內容是否正確填寫');
        return false;
      }

      try {
        // 開始提交，設定載入狀態
        setIsSubmitting(true);

        const eventInfo = getValues('eventInfo');

        // 步驟1: 建立活動
        const createEventData = prepareCreateEventData(eventInfo);
        console.log('準備建立活動，資料:', createEventData);

        const createResult = await triggerCreateEvent(createEventData);
        console.log('建立活動結果:', createResult);

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
        console.log('準備更新標籤與通知，資料:', updateData);

        // 這裡我們觸發更新操作，同時傳入最新的 eventId
        const updateResult = await triggerUpdateEventNoticesTags(
          updateData,
          eventId
        );
        console.log('更新結果:', updateResult);

        // 如果更新成功，回傳成功狀態
        if (updateResult) {
          toast.success('活動建立完成，標籤與通知設定成功！');
          return true;
        }

        return false;
      } catch (error) {
        console.error('表單提交錯誤:', error);
        toast.error(
          error instanceof Error ? error.message : '活動建立過程中發生錯誤'
        );
        return false;
      } finally {
        // 無論成功或失敗都要重設載入狀態
        setIsSubmitting(false);
      }
    };

    return (
      <div className="flex flex-col gap-6 self-stretch px-4 py-6 md:px-0 md:py-0">
        <h1 className="text-2xl font-semibold text-[#121212]">創建活動</h1>

        <div className="flex flex-col gap-6">
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

          <FormField
            label="主辦方名稱"
            name="eventInfo.organizer"
            required
            error={errors.eventInfo?.organizer?.message}
          >
            <FormInput name="eventInfo.organizer" placeholder="主辦方名稱" />
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

          {/* 活動開始時間 - 響應式排版 */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-3">
            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal text-[#4F4F4F]">
                <span className="text-[#AB5F5F]">*</span>活動開始時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.startDate')}
                  onChange={(date) => {
                    setValue('eventInfo.startDate', date);
                    trigger('eventInfo.startDate');
                  }}
                  error={errors.eventInfo?.startDate?.message}
                />

                <TimePicker
                  value={getValues('eventInfo.startTime')}
                  onChange={(time) => {
                    setValue('eventInfo.startTime', time);
                    trigger('eventInfo.startTime');
                  }}
                  error={errors.eventInfo?.startTime?.message}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal text-[#4F4F4F]">
                <span className="text-[#AB5F5F]">*</span>活動結束時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.endDate')}
                  onChange={(date) => {
                    setValue('eventInfo.endDate', date);
                    trigger('eventInfo.endDate');
                  }}
                  error={errors.eventInfo?.endDate?.message}
                />

                <TimePicker
                  value={getValues('eventInfo.endTime')}
                  onChange={(time) => {
                    setValue('eventInfo.endTime', time);
                    trigger('eventInfo.endTime');
                  }}
                  error={errors.eventInfo?.endTime?.message}
                />
              </div>
            </div>
          </div>

          {/* 報名時間 - 響應式排版 */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-3">
            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal text-[#4F4F4F]">
                <span className="text-[#AB5F5F]">*</span>報名開始時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.registration_startDate')}
                  onChange={(date) => {
                    setValue('eventInfo.registration_startDate', date);
                    trigger('eventInfo.registration_startDate');
                  }}
                  error={errors.eventInfo?.registration_startDate?.message}
                />

                <TimePicker
                  value={getValues('eventInfo.registration_startTime')}
                  onChange={(time) => {
                    setValue('eventInfo.registration_startTime', time);
                    trigger('eventInfo.registration_startTime');
                  }}
                  error={errors.eventInfo?.registration_startTime?.message}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal text-[#4F4F4F]">
                <span className="text-[#AB5F5F]">*</span>報名結束時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.registration_endDate')}
                  onChange={(date) => {
                    setValue('eventInfo.registration_endDate', date);
                    trigger('eventInfo.registration_endDate');
                  }}
                  error={errors.eventInfo?.registration_endDate?.message}
                />

                <TimePicker
                  value={getValues('eventInfo.registration_endTime')}
                  onChange={(time) => {
                    setValue('eventInfo.registration_endTime', time);
                    trigger('eventInfo.registration_endTime');
                  }}
                  error={errors.eventInfo?.registration_endTime?.message}
                />
              </div>
            </div>
          </div>

          {/* 上限人數 */}
          <div className="w-full md:w-[300px]">
            <FormField
              label="上限人數"
              name="eventInfo.max_participants"
              required
              error={errors.eventInfo?.max_participants?.message}
            >
              <FormNumberInput
                name="eventInfo.max_participants"
                placeholder="50"
              />
            </FormField>
          </div>

          {/* 活動摘要 */}
          <div className="flex flex-col gap-2">
            <FormField
              label="活動摘要"
              name="eventInfo.description"
              error={errors.eventInfo?.description?.message}
            >
              <div className="border border-[#B0B0B0] rounded-2xl overflow-hidden">
                {/* 文字輸入區域 */}
                <textarea
                  rows={8}
                  placeholder="請描述您的活動內容（最多5000字）"
                  className="w-full border-0 p-3 resize-none bg-white font-sans text-base outline-none"
                  {...register('eventInfo.description')}
                />
              </div>
            </FormField>
          </div>

          {/* 活動標籤 */}
          <div className="flex flex-col gap-3">
            <FormField
              label="活動標籤"
              name="eventInfo.tags"
              required
              error={errors.eventInfo?.tags?.message}
            >
              <div className="flex flex-wrap gap-5">
                {eventTagsLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>載入標籤中...</span>
                  </div>
                ) : eventTagsError ? (
                  <div className="text-red-500">
                    載入標籤失敗，請重新整理頁面
                  </div>
                ) : (
                  <FormCheckboxGroup name="tags" options={tagOptions} />
                )}
              </div>
            </FormField>
          </div>

          {/* 取消政策 */}
          <div className="flex flex-col gap-3">
            <FormField
              label="取消政策"
              name="eventInfo.cancel_policy"
              error={errors.eventInfo?.cancel_policy?.message}
            >
              <div className="flex items-center gap-6">
                <FormSwitch
                  name="eventInfo.cancel_policy"
                  label="15 天前可免費取消"
                />
              </div>
            </FormField>
          </div>

          {/* 行前通知 */}
          <FormField
            label=""
            name="eventInfo.event_notifications"
            error={errors.eventInfo?.event_notifications?.message}
          >
            <div>
              <FormDynamicInputs
                addButtonLabel="新增"
                placeholder="請輸入行前提醒"
              />
            </div>
          </FormField>
        </div>
      </div>
    );
  }
);

EventInfoForm.displayName = 'EventInfoForm';

export default React.memo(EventInfoForm);

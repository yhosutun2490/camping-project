'use client';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData, createFieldValidator } from '../schema/formDataSchema';
import FormField from '../../../components/form/FormField';
import FormInput from '../../../components/form/FormInput';
import FormCheckboxGroup from '../../../components/form/FormCheckboxGroup';
import FormSwitch from '../../../components/form/FormSwitch';
import FormDynamicInputs from '../../../components/form/FormDynamicInputs';
import { useEventTags } from '@/swr/meta/useEventTags';
import { useGetHostProfile } from '@/swr/host/useHostProfile';
import { useCreateEvent } from '@/swr/events/useCreateEvent';
import { useUpdateEvent } from '@/swr/events/useUpdateEvent';
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
  /** 現有的活動 ID，用於更新模式 */
  eventId?: string | null;
}

export interface EventInfoFormRef {
  handleSubmit: () => Promise<boolean>;
}

const EventInfoForm = forwardRef<EventInfoFormRef, EventInfoFormProps>(
  ({ onEventCreated, eventId }, ref) => {

    // 使用 useEventTags 取得活動標籤
    const {
      data: eventTagsData,
      error: eventTagsError,
      isLoading: eventTagsLoading,
    } = useEventTags();

    // 使用 useHostProfile 取得主辦方資訊
    const { hostProfile, isLoading: hostProfileLoading } = useGetHostProfile();

    // 初始化 API Hooks
    const { trigger: triggerCreateEvent } = useCreateEvent();
    const { updateEvent: triggerUpdateEvent } = useUpdateEvent();
    const { trigger: triggerUpdateEventNoticesTags } = useUpdateEventNoticesTags();

    // 使用 useImperativeHandle 暴露方法給父元件
    useImperativeHandle(ref, () => ({
      handleSubmit: handleNextStep,
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

    // 當有主辦方資料時，設定表單值
    if (hostProfile?.name && !hostProfileLoading) {
      setValue('eventInfo.organizer', hostProfile.name);
    }

    // 建立欄位驗證器實例
    const fieldValidator = createFieldValidator();
    
    // 自定義錯誤狀態管理
    const [customErrors, setCustomErrors] = useState<Record<string, string>>({});

    // 智能驗證函式 - 根據變更的欄位進行相關驗證
    const handleSmartValidation = (changedField: keyof FormData['eventInfo'], formData: FormData['eventInfo']) => {
      const newErrors: Record<string, string> = {};
      
      // 根據變更的欄位決定要檢查哪些驗證
      if (['startDate', 'startTime', 'endDate', 'endTime'].includes(changedField)) {
        // 檢查活動時間邏輯
        if (!fieldValidator.validateActivityTimes(
          formData.startDate, formData.startTime, 
          formData.endDate, formData.endTime
        )) {
          newErrors.endTime = '活動結束時間必須晚於開始時間';
        }
      }
      
      if (['registration_startDate', 'registration_startTime', 'registration_endDate', 'registration_endTime'].includes(changedField)) {
        // 檢查報名時間邏輯
        if (!fieldValidator.validateRegistrationTimes(
          formData.registration_startDate, formData.registration_startTime,
          formData.registration_endDate, formData.registration_endTime
        )) {
          newErrors.registration_endTime = '報名結束時間必須晚於報名開始時間';
        }
        
        // 檢查報名與活動時間關聯
        if (!fieldValidator.validateRegistrationActivityTimes(
          formData.registration_endDate, formData.registration_endTime,
          formData.startDate, formData.startTime
        )) {
          newErrors.registration_endTime = '報名結束時間不得晚於活動開始時間';
        }
      }
      
      setCustomErrors(newErrors);
    };

    // 處理時間欄位變更
    const handleDateTimeChange = (field: keyof FormData['eventInfo'], value: string) => {
      const fullFieldName = `eventInfo.${field}` as const;
      setValue(fullFieldName, value);
      
      // 觸發該欄位的基本驗證
      trigger(fullFieldName);
      
      // 延遲執行智能驗證，等 setValue 完成
      setTimeout(() => {
        const currentFormData = getValues('eventInfo');
        handleSmartValidation(field, currentFormData);
      }, 0);
    };

    // 取得顯示的錯誤訊息（優先顯示自定義錯誤）
    const getErrorMessage = (field: keyof FormData['eventInfo']) => {
      return customErrors[field] || errors.eventInfo?.[field]?.message;
    };

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

      if (!isValid) {
        toast.error('請檢查表單內容是否正確填寫');
        return false;
      }

      try {
        const eventInfo = getValues('eventInfo');
        let currentEventId = eventId;

        // 步驟1: 根據是否有 eventId 決定建立或更新活動
        if (currentEventId) {
          // 更新現有活動
          const updateEventData = prepareCreateEventData(eventInfo);

          try {
            const updateResult = await triggerUpdateEvent({
              eventId: currentEventId,
              payload: updateEventData,
            });

            if (!updateResult?.data?.event?.id) {
              throw new Error('活動更新失敗');
            }
          } catch (updateError) {
            console.error('更新活動錯誤:', updateError);
            return false;
          }
        } else {
          // 建立新活動
          const createEventData = prepareCreateEventData(eventInfo);

          try {
            const createResult = await triggerCreateEvent(createEventData);

            if (!createResult?.data?.event?.id) {
              throw new Error('活動建立失敗，未返回活動ID');
            }

            // 取得活動ID，並設定為目前ID
            currentEventId = createResult.data.event.id;

            // 通知父元件活動已建立並傳遞 ID
            if (onEventCreated) {
              onEventCreated(currentEventId);
            }
          } catch (createError) {
            console.error('建立活動錯誤:', createError);
            return false;
          }
        }

        // 步驟2: 準備更新資料
        const updateData = prepareUpdateNoticesTagsData(eventInfo);

        try {
          // 這裡我們觸發更新操作，同時傳入最新的 eventId
          const updateResult = await triggerUpdateEventNoticesTags(
            updateData,
            currentEventId
          );
          
          // 如果更新成功，回傳成功狀態
          if (updateResult) {
            return true;
          }
          
          return false;
        } catch (tagsError) {
          console.error('更新標籤與通知錯誤:', tagsError);
          return false;
        }
      } catch (error) {
        console.error('表單提交錯誤:', error);
        toast.error('提交失敗，請稍後再試');
        return false;
      } 
    };

    return (
      <div className="flex flex-col gap-6 self-stretch px-4 py-6 md:px-0 md:py-0">
        <h1 className="text-2xl font-semibold leading-normal text-[#121212]">
          {eventId ? '編輯活動' : '建立活動'}
        </h1>

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
            <FormInput 
              name="eventInfo.organizer" 
              placeholder="主辦方名稱"
              disabled
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

          {/* 活動開始時間 - 響應式排版 */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-3">
            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal leading-normal text-[#4f4f4f]">
                <span className="text-[#ab5f5f]">*</span>活動開始時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.startDate')}
                  onChange={(date) => handleDateTimeChange('startDate', date)}
                  error={getErrorMessage('startDate')}
                />

                <TimePicker
                  value={getValues('eventInfo.startTime')}
                  onChange={(time) => handleDateTimeChange('startTime', time)}
                  error={getErrorMessage('startTime')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal leading-normal text-[#4f4f4f]">
                <span className="text-[#ab5f5f]">*</span>活動結束時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.endDate')}
                  onChange={(date) => handleDateTimeChange('endDate', date)}
                  error={getErrorMessage('endDate')}
                />

                <TimePicker
                  value={getValues('eventInfo.endTime')}
                  onChange={(time) => handleDateTimeChange('endTime', time)}
                  error={getErrorMessage('endTime')}
                />
              </div>
            </div>
          </div>

          {/* 報名時間 - 響應式排版 */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-3">
            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal leading-normal text-[#4f4f4f]">
                <span className="text-[#ab5f5f]">*</span>報名開始時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.registration_startDate')}
                  onChange={(date) => handleDateTimeChange('registration_startDate', date)}
                  error={getErrorMessage('registration_startDate')}
                />

                <TimePicker
                  value={getValues('eventInfo.registration_startTime')}
                  onChange={(time) => handleDateTimeChange('registration_startTime', time)}
                  error={getErrorMessage('registration_startTime')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 md:w-1/2">
              <label className="text-sm font-normal leading-normal text-[#4f4f4f]">
                <span className="text-[#ab5f5f]">*</span>報名結束時間
              </label>
              <div className="flex flex-row justify-stretch items-stretch gap-3">
                <DatePicker
                  value={getValues('eventInfo.registration_endDate')}
                  onChange={(date) => handleDateTimeChange('registration_endDate', date)}
                  error={getErrorMessage('registration_endDate')}
                />

                <TimePicker
                  value={getValues('eventInfo.registration_endTime')}
                  onChange={(time) => handleDateTimeChange('registration_endTime', time)}
                  error={getErrorMessage('registration_endTime')}
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
                    <span className="text-base font-normal leading-normal text-[#6d6d6d]">載入標籤中...</span>
                  </div>
                ) : eventTagsError ? (
                  <div className="text-base font-normal leading-normal text-[#ab5f5f]">
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

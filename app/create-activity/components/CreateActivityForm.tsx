'use client';
import React, { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataSchema, FormData } from '../schema/formDataSchema';
import EventStepper from './EventStepper';
import EventInfoForm, { EventInfoFormRef } from './EventInfoForm';
import UploadCoverForm, { UploadCoverFormRef } from './UploadCoverForm';
import UploadEventImageForm, { UploadEventImageFormRef } from './UploadEventImageForm';
import PlanAccordion, { PlanAccordionRef } from './PlanAccordion';
import ActivityCreationSuccess from './ActivityCreationSuccess';
import StepNavigation from './StepNavigation';

const CreateActivityForm: React.FC = () => {
  // 添加 eventId 狀態
  const [eventId, setEventId] = useState<string | null>(null);
  
  // 添加載入狀態管理
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('處理中...');

  // 建立各步驟的 ref
  const eventInfoFormRef = useRef<EventInfoFormRef>(null);
  const uploadCoverFormRef = useRef<UploadCoverFormRef>(null);
  const uploadEventImageFormRef = useRef<UploadEventImageFormRef>(null);
  const planAccordionRef = useRef<PlanAccordionRef>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange',
    defaultValues: {
      eventInfo: {
        title: '',
        organizer: '',
        address: '', // 改名從 location 到 address
        startDate: new Date().toISOString().slice(0, 10),
        startTime: '00:00',
        endDate: new Date().toISOString().slice(0, 10),
        endTime: '00:00',
        registration_startDate: new Date().toISOString().slice(0, 10),
        registration_startTime: '00:00',
        registration_endDate: new Date().toISOString().slice(0, 10),
        registration_endTime: '00:00',
        max_participants: 1, // 改名從 maxParticipants 到 max_participants
        price: 0, // 新增價格欄位
        description: '',
        tags: [],
        cancel_policy: false, // 改名從 cancelPolicy 到 cancel_policy
        event_notifications: [], // 改名從 notifications 到 event_notifications
      },
      coverImages: [],
      eventImages: [],
      plans: [
        {
          title: '基本方案',
          price: 100,
          discountPrice: undefined,
          content: [],
          addOns: [],
        },
      ],
    },
  });

  // 步驟導航狀態
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 驗證指定步驟資料
  const validateStep = async (step: number) => {
    switch (step) {
      case 1:
        return methods.trigger('eventInfo');
      case 2:
        return methods.trigger('coverImages');
      case 3:
        return methods.trigger('eventImages');
      case 4:
        return methods.trigger('plans');
      case 5:
        return true; // 第 5 步不需要驗證，只是結果展示
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    const valid = await validateStep(currentStep);
    if (valid && currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  /**
   * 步驟3的處理邏輯 - 調用 UploadEventImageForm 的 ref 方法
   */
  const handleStep3Submit = async (): Promise<boolean> => {
    if (uploadEventImageFormRef.current) {
      return await uploadEventImageFormRef.current.handleSubmit();
    }
    return false;
  };

  /**
   * 步驟4的處理邏輯 - 調用 PlanAccordion 的 ref 方法
   */
  const handleStep4Submit = async (): Promise<boolean> => {
    if (planAccordionRef.current) {
      return await planAccordionRef.current.handleSubmit();
    }
    return false;
  };

  /**
   * 處理步驟的下一步邏輯
   */
  const handleStepNext = async () => {
    console.log('handleStepNext 被調用，當前步驟:', currentStep);
    setIsLoading(true);
    
    try {
      let success = false;
      
      switch (currentStep) {
        case 1:
          setLoadingText('建立活動中...');
          if (eventInfoFormRef.current) {
            console.log('調用 EventInfoForm handleSubmit');
            success = await eventInfoFormRef.current.handleSubmit();
            console.log('EventInfoForm handleSubmit 結果:', success);
          } else {
            console.error('eventInfoFormRef.current 為 null');
          }
          break;
        case 2:
          setLoadingText('上傳封面圖片中...');
          if (uploadCoverFormRef.current) {
            success = await uploadCoverFormRef.current.handleSubmit();
          }
          break;
        case 3:
          setLoadingText('上傳活動圖片中...');
          success = await handleStep3Submit();
          break;
        case 4:
          setLoadingText('建立方案中...');
          success = await handleStep4Submit();
          break;
        default:
          break;
      }
      
      console.log('步驟完成，成功:', success, '當前步驟:', currentStep);
      if (success && currentStep < 5) {
        setCurrentStep(currentStep + 1);
        console.log('跳轉到下一步:', currentStep + 1);
      }
    } catch (error) {
      console.error('handleStepNext 錯誤:', error);
    } finally {
      setIsLoading(false);
      console.log('設定 isLoading 為 false');
    }
  };

  /**
   * 處理活動建立成功後的回調
   */
  const handleEventCreated = (id: string) => {
    setEventId(id);
  };

  /**
   * 獲取當前步驟的按鈕配置
   */
  const getStepButtonConfig = () => {
    // 如果是第1步，獲取 EventInfoForm 的載入狀態
    let currentIsLoading = isLoading;
    let currentLoadingText = loadingText;
    
    if (currentStep === 1 && eventInfoFormRef.current) {
      const eventInfoLoadingState = eventInfoFormRef.current.getLoadingState();
      currentIsLoading = currentIsLoading || eventInfoLoadingState.isLoading;
      currentLoadingText = eventInfoLoadingState.loadingText || currentLoadingText;
    }

    const baseConfig = {
      showPrevButton: currentStep > 1 && currentStep < 5,
      showNextButton: currentStep < 5,
      onPrevClick: handlePrevStep,
      onNextClick: handleStepNext,
      isLoading: currentIsLoading,
      loadingText: currentLoadingText,
    };

    switch (currentStep) {
      case 1:
        return {
          ...baseConfig,
          showPrevButton: false,
          nextButtonText: '繼續填寫，下一步',
          nextButtonDisabled: false,
        };
      case 2:
        return {
          ...baseConfig,
          nextButtonText: '上傳圖片並繼續下一步',
          nextButtonDisabled: false,
        };
      case 3:
        return {
          ...baseConfig,
          nextButtonText: '上傳圖片並繼續下一步',
          nextButtonDisabled: false,
        };
      case 4:
        return {
          ...baseConfig,
          nextButtonText: '建立方案',
          nextButtonDisabled: false,
        };
      default:
        return {
          ...baseConfig,
          showNextButton: false,
        };
    }
  };

  const handleStepChange = async (step: number) => {
    // 防止用戶跳轉到步驟 5（必須完成整個流程）
    if (step === 5) return;

    const checks = Array.from({ length: step - 1 }, (_, i) =>
      validateStep(i + 1)
    );
    if ((await Promise.all(checks)).every(Boolean)) setCurrentStep(step);
  };

  return (
    <FormProvider<FormData> {...methods}>
      <div className="bg-neutral-50 min-h-screen">
        <div className="max-w-4xl mx-auto pb-32"> {/* 添加底部邊距避免被固定導航遮擋 */}
          <div className="py-10">
            <EventStepper
              currentStep={currentStep}
              totalSteps={5}
              stepTitles={[
                '基本資訊',
                '活動封面',
                '活動內容圖片',
                '方案設計',
                '建立完成',
              ]}
              onStepChange={handleStepChange}
              completedSteps={undefined}
            />
          </div>
          <div className="mt-4">
            {currentStep === 1 && (
              <EventInfoForm
                ref={eventInfoFormRef}
                onEventCreated={handleEventCreated}
              />
            )}
            {currentStep === 2 && (
              <UploadCoverForm
                ref={uploadCoverFormRef}
                onNextStep={handleNextStep}
                eventId={eventId}
              />
            )}
            {currentStep === 3 && (
              <UploadEventImageForm
                ref={uploadEventImageFormRef}
                eventId={eventId}
              />
            )}
            {currentStep === 4 && (
              <PlanAccordion
                ref={planAccordionRef}
                eventId={eventId}
              />
            )}
            {currentStep === 5 &&
              (eventId ? (
                <ActivityCreationSuccess
                  eventId={eventId}
                  onPrevStep={handlePrevStep}
                />
              ) : (
                <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm text-center">
                  <h2 className="text-2xl font-bold mb-4 text-error">
                    發生錯誤
                  </h2>
                  <p className="text-base-content/70 mb-6">
                    活動 ID 遺失，無法顯示建立結果。
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setCurrentStep(1)}
                  >
                    重新開始
                  </button>
                </div>
              ))}
          </div>
        </div>
        
        {/* 固定底部導航 - 只在步驟1-4顯示 */}
        {currentStep < 5 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <StepNavigation {...getStepButtonConfig()} />
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default React.memo(CreateActivityForm);

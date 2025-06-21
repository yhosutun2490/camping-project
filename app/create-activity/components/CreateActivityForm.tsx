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

// 定義每個步驟的載入狀態
type StepLoadingState = {
  isLoading: boolean;
  loadingText: string;
};

// 定義所有步驟的載入狀態
type StepsLoadingState = {
  [key: number]: StepLoadingState;
};

const CreateActivityForm: React.FC = () => {
  // 建立本地日期函式（避免 UTC 時區問題）
  const getLocalDateString = (daysOffset: number = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + daysOffset);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // 活動 ID 狀態
  const [eventId, setEventId] = useState<string | null>(null);
  
  // 統一管理所有步驟的載入狀態
  const [stepsLoadingState, setStepsLoadingState] = useState<StepsLoadingState>({
    1: { isLoading: false, loadingText: '建立活動中...' },
    2: { isLoading: false, loadingText: '上傳封面圖片中...' },
    3: { isLoading: false, loadingText: '上傳活動圖片中...' },
    4: { isLoading: false, loadingText: '建立方案中...' },
  });

  // 建立各步驟的 ref
  const eventInfoFormRef = useRef<EventInfoFormRef>(null);
  const uploadCoverFormRef = useRef<UploadCoverFormRef>(null);
  const uploadEventImageFormRef = useRef<UploadEventImageFormRef>(null);
  const planAccordionRef = useRef<PlanAccordionRef>(null);

  // 當前步驟
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 更新特定步驟的載入狀態
  const updateStepLoadingState = (step: number, isLoading: boolean, loadingText?: string) => {
    setStepsLoadingState(prevState => ({
      ...prevState,
      [step]: { 
        isLoading, 
        loadingText: loadingText || prevState[step].loadingText 
      }
    }));
  };

  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange',
    defaultValues: {
      eventInfo: {
        title: '',
        organizer: '',
        address: '',
        startDate: getLocalDateString(7), // 活動開始：7天後
        startTime: '10:00',
        endDate: getLocalDateString(7), // 活動結束：同一天
        endTime: '18:00',
        registration_startDate: getLocalDateString(1), // 報名開始：明天
        registration_startTime: '00:00',
        registration_endDate: getLocalDateString(6), // 報名結束：活動前1天
        registration_endTime: '23:45',
        max_participants: 1,
        price: 0, // 新增價格欄位
        description: '',
        tags: [],
        cancel_policy: false,
        event_notifications: [],
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
    const step = currentStep;
    console.log(`處理第 ${step} 步驟的下一步操作`);
    
    // 設定當前步驟為載入中
    updateStepLoadingState(step, true);
    
    try {
      let success = false;
      
      switch (step) {
        case 1:
          if (eventInfoFormRef.current) {
            // 調用子元件方法，但載入狀態由父元件控制
            success = await eventInfoFormRef.current.handleSubmit();
          }
          break;
        case 2:
          if (uploadCoverFormRef.current) {
            success = await uploadCoverFormRef.current.handleSubmit();
          }
          break;
        case 3:
          success = await handleStep3Submit();
          break;
        case 4:
          success = await handleStep4Submit();
          break;
      }
      
      console.log(`步驟 ${step} 完成，結果:`, success);
      
      // 不論成功與否，立即重置這一步的載入狀態
      updateStepLoadingState(step, false);
      
      // 如果成功且不是最後一步，進入下一步
      if (success && step < 5) {
        setCurrentStep(step + 1);
      }
    } catch (error) {
      console.error(`步驟 ${step} 處理錯誤:`, error);
      
      // 發生錯誤時，立即重置當前步驟的載入狀態
      updateStepLoadingState(step, false);
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
    const currentLoadingState = stepsLoadingState[currentStep];
    
    const baseConfig = {
      showPrevButton: currentStep > 1 && currentStep < 5,
      showNextButton: currentStep < 5,
      onPrevClick: handlePrevStep,
      onNextClick: handleStepNext,
      isLoading: currentLoadingState.isLoading,
      loadingText: currentLoadingState.loadingText,
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
                eventId={eventId}
              />
            )}
            {currentStep === 2 && (
              <UploadCoverForm
                ref={uploadCoverFormRef}
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

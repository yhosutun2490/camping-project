'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataSchemaEdit, FormDataEdit } from '@/app/create-activity/schema/formDataSchema';
import EventStepper from '@/app/create-activity/components/EventStepper';
import EventInfoForm, { EventInfoFormRef } from '@/app/create-activity/components/EventInfoForm';
import UploadCoverForm, { UploadCoverFormRef } from '@/app/create-activity/components/UploadCoverForm';
import UploadEventImageForm, { UploadEventImageFormRef } from '@/app/create-activity/components/UploadEventImageForm';
import PlanAccordion, { PlanAccordionRef } from '@/app/create-activity/components/PlanAccordion';
import StepNavigation from '@/app/create-activity/components/StepNavigation';
import toast from 'react-hot-toast';
import EditSuccessPage from './EditSuccessPage';

// 定義每個步驟的載入狀態
type StepLoadingState = {
  isLoading: boolean;
  loadingText: string;
};

// 定義所有步驟的載入狀態
type StepsLoadingState = {
  [key: number]: StepLoadingState;
};

// 定義元件 props
interface EditActivityFormProps {
  /** 初始資料 */
  initialData: FormDataEdit;
  /** 活動 ID */
  eventId: string;
}

const EditActivityForm: React.FC<EditActivityFormProps> = ({
  initialData,
  eventId,
}) => {
  const router = useRouter();
  
  // 統一管理所有步驟的載入狀態
  const [stepsLoadingState, setStepsLoadingState] = useState<StepsLoadingState>({
    1: { isLoading: false, loadingText: '更新活動資訊中...' },
    2: { isLoading: false, loadingText: '更新封面圖片中...' },
    3: { isLoading: false, loadingText: '更新活動圖片中...' },
    4: { isLoading: false, loadingText: '更新方案中...' },
  });

  // 建立各步驟的 ref
  const eventInfoFormRef = useRef<EventInfoFormRef>(null);
  const uploadCoverFormRef = useRef<UploadCoverFormRef>(null);
  const uploadEventImageFormRef = useRef<UploadEventImageFormRef>(null);
  const planAccordionRef = useRef<PlanAccordionRef>(null);

  // 當前步驟
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // 是否需要滾動的標記
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  
  // 監聽步驟變化，自動滾動到頂部
  useEffect(() => {
    if (shouldScroll) {
      // 延遲滾動確保 DOM 已更新
      const timer = setTimeout(() => {
        scrollToTop();
        setShouldScroll(false); // 重置滾動標記
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, shouldScroll]);

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

  const methods = useForm<FormDataEdit>({
    resolver: zodResolver(FormDataSchemaEdit),
    mode: 'onChange',
    defaultValues: initialData,
  });

  // 當 initialData 變化時，重新載入表單資料
  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData, methods]);

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
        return true; // 成功頁面不需要驗證
      default:
        return false;
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setShouldScroll(true); // 標記需要滾動
      setCurrentStep(currentStep - 1);
    }
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
   * 將頁面捲軸直接置頂（無動畫）
   */
  const scrollToTop = () => {
    // 取得真正的滾動容器
    const scrollContainer = document.getElementById('main-scroll-container');
    
    if (!scrollContainer) {
      // 備用方案：使用 window 滾動
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;
    }
    
    // 直接置頂，不使用動畫
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  /**
   * 處理步驟的下一步邏輯
   */
  const handleStepNext = async () => {
    const step = currentStep;
    
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
      
      // 不論成功與否，立即重置這一步的載入狀態
      updateStepLoadingState(step, false);
      
      // 如果成功且不是最後一步，進入下一步
      if (success && step < 5) {
        setShouldScroll(true); // 標記需要滾動
        setCurrentStep(step + 1);
      }
      
    } catch (error) {
      console.error(`步驟 ${step} 處理錯誤:`, error);
      
      // 發生錯誤時，立即重置當前步驟的載入狀態
      updateStepLoadingState(step, false);
      
      // 顯示錯誤訊息
      toast.error('發生未預期的錯誤，請稍後再試');
    }
  };

  /**
   * 處理編輯完成後返回活動列表
   */
  const handleBackToActivities = () => {
    router.push('/host/activities');
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
          nextButtonText: '更新資訊並繼續',
          nextButtonDisabled: false,
        };
      case 2:
        return {
          ...baseConfig,
          nextButtonText: '更新封面並繼續',
          nextButtonDisabled: false,
        };
      case 3:
        return {
          ...baseConfig,
          nextButtonText: '更新圖片並繼續',
          nextButtonDisabled: false,
        };
      case 4:
        return {
          ...baseConfig,
          nextButtonText: '更新方案',
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
    if ((await Promise.all(checks)).every(Boolean)) {
      setShouldScroll(true); // 標記需要滾動
      setCurrentStep(step);
    }
  };

  return (
    <FormProvider<FormDataEdit> {...methods}>
      <div className="bg-[#F6F6F6] min-h-screen">
        <div className="max-w-4xl mx-auto pb-32"> {/* 添加底部邊距避免被固定導航遮擋 */}
          <div className="py-10">
            <EventStepper
              currentStep={currentStep}
              totalSteps={5}
              stepTitles={[
                '編輯基本資訊',
                '編輯活動封面',
                '編輯活動內容圖片',
                '編輯方案設計',
                '編輯完成',
              ]}
              onStepChange={handleStepChange}
              completedSteps={undefined}
            />
          </div>
          <div className="mt-4">
            {currentStep === 1 && (
              <EventInfoForm
                ref={eventInfoFormRef}
                eventId={eventId}
                onEventCreated={() => {}} // 編輯模式不需要此回調
              />
            )}
            {currentStep === 2 && (
              <UploadCoverForm
                ref={uploadCoverFormRef}
                eventId={eventId}
                isEditMode={true} // 編輯模式
              />
            )}
            {currentStep === 3 && (
              <UploadEventImageForm
                ref={uploadEventImageFormRef}
                eventId={eventId}
                isEditMode={true} // 編輯模式
              />
            )}
            {currentStep === 4 && (
              <PlanAccordion
                ref={planAccordionRef}
                eventId={eventId}
              />
            )}
            {currentStep === 5 && (
              <EditSuccessPage
                eventId={eventId}
                onBackToActivities={handleBackToActivities}
              />
            )}
          </div>
        </div>
        
        {/* 固定底部導航 - 只在步驟1-4顯示 */}
        {currentStep < 5 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E7E7] z-50 px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <StepNavigation {...getStepButtonConfig()} />
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default React.memo(EditActivityForm);

"use client"
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDataSchema, FormData } from '../schema/formDataSchema'
import EventStepper from './EventStepper'
import EventInfoForm from './EventInfoForm'
import UploadCoverForm from './UploadCoverForm'
import UploadEventImageForm from './UploadEventImageForm'
import PlanAccordion from './PlanAccordion'
import ActivityCreationSuccess from './ActivityCreationSuccess'

const CreateActivityForm: React.FC = () => {
  // 添加 eventId 狀態
  const [eventId, setEventId] = useState<string | null>(null)

  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange',
    defaultValues: {
      eventInfo: {
        title: '', 
        organizer: '', 
        address: '', // 改名從 location 到 address
        longitude: 121.5633, // 預設台北101經度
        latitude: 25.0338, // 預設台北101緯度
        startDate: new Date().toISOString().slice(0, 10),
        startTime: '00:00', 
        endDate: new Date().toISOString().slice(0, 10),
        endTime: '00:00', 
        registration_open_time: new Date().toISOString().slice(0, 16), // 報名開始時間
        registration_close_time: new Date().toISOString().slice(0, 16), // 報名結束時間
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
        { title: '基本方案', price: 100, discountPrice: undefined, content: [], addOns: [] }
      ],
    },
  })

  // 步驟導航狀態
  const [currentStep, setCurrentStep] = useState<number>(1)

  // 驗證指定步驟資料
  const validateStep = async (step: number) => {
    switch (step) {
      case 1: return methods.trigger('eventInfo')
      case 2: return methods.trigger('coverImages')
      case 3: return methods.trigger('eventImages')
      case 4: return methods.trigger('plans')
      case 5: return true // 第 5 步不需要驗證，只是結果展示
      default: return false
    }
  }

  const handleNextStep = async () => {
    const valid = await validateStep(currentStep)
    if (valid && currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  /**
   * 處理方案建立完成後導航到成功頁面
   */
  const handlePlansComplete = () => {
    setCurrentStep(5);
  }

  const handleStepChange = async (step: number) => {
    // 防止用戶跳轉到步驟 5（必須完成整個流程）
    if (step === 5) return;
    
    const checks = Array.from({ length: step - 1 }, (_, i) => validateStep(i + 1))
    if ((await Promise.all(checks)).every(Boolean)) setCurrentStep(step)
  }

  return (
    <FormProvider<FormData> {...methods}>
      <div className="p-40">
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
        <div className="mt-4">
          {currentStep === 1 && (
            <EventInfoForm 
              onNextStep={handleNextStep} 
              onEventCreated={setEventId} 
            />
          )}
          {currentStep === 2 && (
            <UploadCoverForm 
              onNextStep={handleNextStep} 
              onPrevStep={handlePrevStep}
              eventId={eventId} 
            />
          )}
          {currentStep === 3 && (
            <UploadEventImageForm 
              onNextStep={handleNextStep} 
              onPrevStep={handlePrevStep}
              eventId={eventId}
            />
          )}
          {currentStep === 4 && (
            <PlanAccordion 
              onPrevStep={handlePrevStep} 
              onSubmit={handlePlansComplete}
              eventId={eventId} 
            />
          )}
          {currentStep === 5 && (
            eventId ? (
              <ActivityCreationSuccess
                eventId={eventId}
                onPrevStep={handlePrevStep}
              />
            ) : (
              <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm text-center">
                <h2 className="text-2xl font-bold mb-4 text-error">發生錯誤</h2>
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
            )
          )}
        </div>
      </div>
    </FormProvider>
  )
}

export default React.memo(CreateActivityForm)

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

const CreateActivityForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange',
    defaultValues: {
      eventInfo: {
        title: '', organizer: '', location: '',
        startDate: new Date().toISOString().slice(0, 10),
        startTime: '00:00', endDate: new Date().toISOString().slice(0, 10),
        endTime: '00:00', maxParticipants: 1,
        description: '', tags: '寵物友善', cancelPolicy: false,
        notifications: [],
      },
      coverImages: [],
      eventImages: [],
      plans: [
        { title: '', price: 0, discountPrice: undefined, content: [], addOns: [] }
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
      default: return false
    }
  }

  const handleNextStep = async () => {
    const valid = await validateStep(currentStep)
    if (valid && currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleStepChange = async (step: number) => {
    const checks = Array.from({ length: step - 1 }, (_, i) => validateStep(i + 1))
    if ((await Promise.all(checks)).every(Boolean)) setCurrentStep(step)
  }

  return (
    <FormProvider<FormData> {...methods}>
      <div className="p-40">
        <EventStepper
          currentStep={currentStep}
          totalSteps={4}
          stepTitles={[
            '基本資訊',
            '活動封面',
            '活動內容圖片',
            '方案設計',
          ]}
          onStepChange={handleStepChange}
          completedSteps={undefined}
        />
        <div className="mt-4">
          {currentStep === 1 && <EventInfoForm onNextStep={handleNextStep} />}
          {currentStep === 2 && (
            <UploadCoverForm onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
          )}
          {currentStep === 3 && (
            <UploadEventImageForm onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
          )}
          {currentStep === 4 && (
            <PlanAccordion onPrevStep={handlePrevStep} onSubmit={methods.handleSubmit(data => console.log(data))} />
          )}
        </div>
      </div>
    </FormProvider>
  )
}

export default React.memo(CreateActivityForm)

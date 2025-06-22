import * as z from 'zod';

// 建立日期時間驗證輔助函式
const createDateTimeValidation = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    // 檢查是否為未來日期
    isFutureDate: (date: string) => {
      const inputDate = new Date(date);
      inputDate.setHours(0, 0, 0, 0);
      return inputDate > today;
    },
    
    // 檢查是否為未來日期時間（使用本地時區）
    isFutureDateTime: (date: string, time: string) => {
      // 使用本地時區建立日期時間物件
      const [year, month, day] = date.split('-').map(Number);
      const [hours, minutes] = time.split(':').map(Number);
      const dateTime = new Date(year, month - 1, day, hours, minutes);
      const now = new Date();
      return dateTime > now;
    }
  };
};

const dateTimeValidator = createDateTimeValidation();

// Step1: 活動基本資訊 - 加強欄位層級驗證
export const EventInfoSchema = z
  .object({
    title: z.string().min(1, '請輸入活動主題').max(100, '最多100字'),
    organizer: z.string().min(1, '請輸入主辦方名稱').max(50, '最多50字'),
    // 更改為 address
    address: z.string().min(1, '請輸入活動地點').max(100, '最多100字'),
    
    // 活動日期時間 - 增加即時驗證
    startDate: z
      .string()
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), '格式需為YYYY-MM-DD')
      .refine((val) => dateTimeValidator.isFutureDate(val), '活動開始日期必須是未來日期'),
    
    startTime: z
      .string()
      .refine((val) => /^\d{2}:\d{2}$/.test(val), '格式需為HH:mm'),
    
    endDate: z
      .string()
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), '格式需為YYYY-MM-DD')
      .refine((val) => dateTimeValidator.isFutureDate(val), '活動結束日期必須是未來日期'),
    
    endTime: z
      .string()
      .refine((val) => /^\d{2}:\d{2}$/.test(val), '格式需為HH:mm'),
    
    // 報名日期時間 - 增加即時驗證
    registration_startDate: z
      .string()
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), '格式需為YYYY-MM-DD')
      .refine((val) => dateTimeValidator.isFutureDate(val), '報名開始日期必須是未來日期'),
    
    registration_startTime: z
      .string()
      .refine((val) => /^\d{2}:\d{2}$/.test(val), '格式需為HH:mm'),
    
    registration_endDate: z
      .string()
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), '格式需為YYYY-MM-DD')
      .refine((val) => dateTimeValidator.isFutureDate(val), '報名結束日期必須是未來日期'),
    
    registration_endTime: z
      .string()
      .refine((val) => /^\d{2}:\d{2}$/.test(val), '格式需為HH:mm'),
    
    // 改為 max_participants
    max_participants: z
      .number({ invalid_type_error: '請輸入有效的數字' })
      .min(10, '上限人數至少10人')
      .max(10000, '上限人數最多10000人'),
    // 新增價格
    price: z
      .number({ invalid_type_error: '請輸入有效的價格' })
      .min(0, '價格不可為負'),
    description: z.string().min(1, '請輸入活動描述').max(5000, '最多5000字'),
    // 改為多選字串陣列
    tags: z.array(z.string()).min(1, '請至少選擇一個標籤'),
    // 改為 cancel_policy
    cancel_policy: z.boolean(),
    // 改為 event_notifications
    event_notifications: z.array(z.string().min(5, '至少5字')).optional(),
  })
  // 跨欄位驗證規則
  .refine((data) => {
    // 1. 活動開始時間不得超過結束時間
    const startDateTime = new Date(`${data.startDate}T${data.startTime}:00`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}:00`);
    return endDateTime > startDateTime;
  }, {
    message: '活動結束時間必須晚於開始時間',
    path: ['endTime'],
  })
  .refine((data) => {
    // 2. 報名開始時間不得超過結束時間
    const registrationStartDateTime = new Date(`${data.registration_startDate}T${data.registration_startTime}:00`);
    const registrationEndDateTime = new Date(`${data.registration_endDate}T${data.registration_endTime}:00`);
    return registrationEndDateTime > registrationStartDateTime;
  }, {
    message: '報名結束時間必須晚於報名開始時間',
    path: ['registration_endTime'],
  })
  .refine((data) => {
    // 3. 報名結束時間不得晚於活動開始時間
    const activityStartDateTime = new Date(`${data.startDate}T${data.startTime}:00`);
    const registrationEndDateTime = new Date(`${data.registration_endDate}T${data.registration_endTime}:00`);
    return registrationEndDateTime <= activityStartDateTime;
  }, {
    message: '報名結束時間不得晚於活動開始時間',
    path: ['registration_endTime'],
  })
  .refine((data) => {
    // 4. 報名開始日期時間必須是未來時間
    return dateTimeValidator.isFutureDateTime(data.registration_startDate, data.registration_startTime);
  }, {
    message: '報名開始時間必須是未來時間',
    path: ['registration_startTime'],
  });

// 建立單獨的欄位驗證器（用於即時驗證）
export const createFieldValidator = () => {
  return {
    // 驗證活動時間邏輯
    validateActivityTimes: (startDate: string, startTime: string, endDate: string, endTime: string) => {
      if (!startDate || !startTime || !endDate || !endTime) return true; // 如果欄位未完整填寫，不驗證
      
      const startDateTime = new Date(`${startDate}T${startTime}:00`);
      const endDateTime = new Date(`${endDate}T${endTime}:00`);
      return endDateTime > startDateTime;
    },
    
    // 驗證報名時間邏輯
    validateRegistrationTimes: (startDate: string, startTime: string, endDate: string, endTime: string) => {
      if (!startDate || !startTime || !endDate || !endTime) return true;
      
      const startDateTime = new Date(`${startDate}T${startTime}:00`);
      const endDateTime = new Date(`${endDate}T${endTime}:00`);
      return endDateTime > startDateTime;
    },
    
    // 驗證報名與活動時間關聯
    validateRegistrationActivityTimes: (
      regEndDate: string, regEndTime: string, 
      actStartDate: string, actStartTime: string
    ) => {
      if (!regEndDate || !regEndTime || !actStartDate || !actStartTime) return true;
      
      const regEndDateTime = new Date(`${regEndDate}T${regEndTime}:00`);
      const actStartDateTime = new Date(`${actStartDate}T${actStartTime}:00`);
      return regEndDateTime <= actStartDateTime;
    }
  };
};

// 圖片檔案驗證
const fileSchema = z
  .object({
    type: z.string(),
    size: z.number(),
  })
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    {
      message: '僅接受 JPEG、PNG、WebP 格式',
    }
  )
  .refine((file) => file.size <= 4 * 1024 * 1024, {
    message: '檔案大小須小於4MB',
  });

// Step2: 封面圖片
export const CoverImageSchema = z
  .array(fileSchema)
  .min(1, '至少上傳1張封面圖片')
  .max(3, '最多3張封面圖片');

// Step2: 封面圖片 (編輯模式)
export const CoverImageSchemaEdit = z
  .array(fileSchema)
  .max(3, '最多3張封面圖片')
  .optional();

// Step3: 活動內容圖片
export const EventImageSchema = z.object({
  file: fileSchema,
  description: z.string().max(100, '最多100字').optional(),
});

export const EventImagesSchema = z
  .array(EventImageSchema)
  .min(1, '請至少上傳一張活動圖片')
  .max(3, '最多3張活動圖片');

// Step3: 活動內容圖片 (編輯模式)
export const EventImagesSchemaEdit = z.array(EventImageSchema).optional();

// Step4: 活動方案
const ContentSchema = z.object({
  value: z.string().min(1, '請輸入內容').max(500, '最多500字'),
})

const AddOnSchema = z.object({
  name: z.string().min(1, '請輸入商品名稱'),
  price: z.number({ invalid_type_error: '請輸入有效的價格' }).min(1, '價格必須大於 0 元'),
});

const PlanSchema = z
  .object({
    id: z.string().optional(), // 用於更新時的方案 ID
    title: z.string().min(1, '請輸入方案標題').max(100, '最多100字'),
    price: z.number({ invalid_type_error: '請輸入有效的價格' }).min(0, '價格不可為負'),
    discountPrice: z.number({ invalid_type_error: '請輸入有效的價格' }).min(0, '價格不可為負').optional(),
    content: z.array(ContentSchema).min(1, '請至少新增一項方案內容'),
    addOns: z.array(AddOnSchema).optional(),
  })
  .refine(
    (data) =>
      data.discountPrice === undefined || data.discountPrice === 0 || data.discountPrice <= data.price,
    {
      message: '折扣價不可大於原價',
      path: ['discountPrice'],
    }
  );
export const PlanArraySchema = z
  .array(PlanSchema)
  .min(1, '請至少一個方案')
  .max(3, '最多3個方案');

// 最終整合
export const FormDataSchema = z.object({
  eventInfo: EventInfoSchema,
  coverImages: CoverImageSchema,
  eventImages: EventImagesSchema,
  plans: PlanArraySchema,
});

// 編輯模式的表單 schema（圖片為非必填）
export const FormDataSchemaEdit = z.object({
  eventInfo: EventInfoSchema,
  coverImages: CoverImageSchemaEdit,
  eventImages: EventImagesSchemaEdit,
  plans: PlanArraySchema,
});

export type FormData = z.infer<typeof FormDataSchema>;
export type FormDataEdit = z.infer<typeof FormDataSchemaEdit>;
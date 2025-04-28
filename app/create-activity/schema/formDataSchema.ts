import * as z from 'zod';

// Step1: 活動基本資訊
export const EventInfoSchema = z
  .object({
    title: z.string().min(1, '請輸入活動主題').max(100, '最多100字'),
    organizer: z.string().min(1, '請輸入主辦方名稱').max(50, '最多50字'),
    location: z.string().min(1, '請輸入活動地點').max(200, '最多200字'),
    startDate: z
      .string()
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), '格式需為YYYY-MM-DD'),
    startTime: z
      .string()
      .refine((val) => /^\d{2}:\d{2}$/.test(val), '格式需為HH:mm'),
    endDate: z
      .string()
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), '格式需為YYYY-MM-DD'),
    endTime: z
      .string()
      .refine((val) => /^\d{2}:\d{2}$/.test(val), '格式需為HH:mm'),
    maxParticipants: z.number().min(1, '至少1人').max(10000, '最多10000人'),
    description: z.string().min(1, '請輸入活動描述').max(5000, '最多5000字'),
    tags: z.enum([
      '寵物友善',
      '閤家同樂',
      '新手友善',
      '進階挑戰',
      '秘境探索',
      '奢豪露營',
    ]),
    cancelPolicy: z.boolean(),
    notifications: z.array(z.string().min(5, '至少5字')).optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '結束日期不可早於開始日期',
    path: ['endDate'],
  });

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

// Step3: 活動內容圖片
export const EventImageSchema = z.object({
  file: fileSchema,
  description: z.string().max(100, '最多100字').optional(),
});

export const EventImagesSchema = z.array(EventImageSchema).optional();

// Step4: 活動方案
const ContentSchema = z.object({
  value: z.string().min(1, '請輸入內容').max(500, '最多500字'),
})

const AddOnSchema = z.object({
  name: z.string().min(1, '請輸入商品名稱'),
  price: z.number().min(0, '價格不可為負'),
});

const PlanSchema = z
  .object({
    title: z.string().min(1, '請輸入方案標題').max(100, '最多100字'),
    price: z.number().min(0, '價格不可為負'),
    discountPrice: z.number().min(0, '價格不可為負').optional(),
    content: z.array(ContentSchema).optional(),
    addOns: z.array(AddOnSchema).optional(),
  })
  .refine(
    (data) =>
      data.discountPrice === undefined || data.discountPrice <= data.price,
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

export type FormData = z.infer<typeof FormDataSchema>;
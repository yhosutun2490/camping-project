import { z } from "zod";

// 日期格式
const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "必須是 YYYY-MM-DD 格式")
  .refine((val) => !isNaN(Date.parse(val)), "不是有效日期")

export const searchBarFormSchema = z.object({
  location: z.string().nullable().optional(),
  price: z.number().min(0).optional(),
  person: z.object({
    adults: z.number().min(0),
    children: z.number().min(0),
    pets: z.number().min(0),
  }),
  dateRange: z.object({
    from: DateString.nullable().optional(),
    to:   DateString.nullable().optional(),
  }) // superRefine 前後日期檢查
  .superRefine((range, ctx) => {
    const { from, to } = range
    if (from && to && new Date(from) > new Date(to)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "結束日期不能早於開始日期",
      })
    }
  })
});

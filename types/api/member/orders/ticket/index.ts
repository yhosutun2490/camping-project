// ❶ 單張票券
export interface MemberOrderTicket {
  id: string;
  ticket_code: string;
  status: string;                // "有效" | "已使用" | ...
  issued_at: string;             // ISO8601
  used_at: string | null;
  qr_image_url: string;
  qr_data_uri: string;
  // 若後端將來補上 event_plan / addons，再加 ? 做成可選
  event_plan?: {
    title: string;
    price: number;
    description: string;
  };
  event_addons?: Record<string, unknown>[];
}

// ❷ API 回傳
export interface PostMemberTicketsQrCodeResponse {
  msg: string;
  data: {
    orders: MemberOrderTicket[]
  }
}


// 1. 成功回傳（帶 data）
export interface SuccessResponse<T> {
    status: "success";
    message: string;
    data: T;
  }

// 2. 成功但不帶 data
export interface SuccessResponseNoData {
    status: "success";
    message: string;
}
  
  
// 3. 失敗回傳（不帶 data）
export interface ErrorResponse {
   status: "failed" | "error";    
   message: string;
 }
// 定義 UserLogin 型別
export interface UserLogin {
    provider: "local" | "google";
    password: string;
    email: string;
  }

export interface UserRegister extends UserLogin  {
    username: string;
    phone: string;
    firstname: string;
    lastname: string;
};

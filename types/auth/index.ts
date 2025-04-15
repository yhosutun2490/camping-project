// 定義 UserLogin 型別
export interface UserLogin {
    provider: "local" | "google";
    username: string;
    password: string;
    email: string;
  }

export interface UserRegister extends UserLogin  {
    firstname: string;
    lastname: string;
};
